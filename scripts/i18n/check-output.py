#!/usr/bin/env python3
"""Audit built locale routes, SEO, internal links and unchanged French markup.
Usage: python scripts/i18n/check-output.py --base / --baseline /tmp/before
"""
import argparse,re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.lang=None;self.canonical=None;self.alternates={};self.links=[]
        self.locales=[];self.text=[];self.tokens=[];self.ignore=None;self.depth=0
        self.feed(text)
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag=='html': self.lang=d.get('lang')
        if tag=='link' and d.get('rel')=='canonical': self.canonical=d.get('href')
        if tag=='link' and d.get('rel')=='alternate':self.alternates[d.get('hreflang')]=d.get('href');return
        if tag=='a':self.links.append(d)
        if tag=='input' and d.get('name')=='locale':self.locales.append(d.get('value'))
        if self.ignore:
            if self.ignore=='switch' and tag not in ['br','img','input','meta','link','hr','source','wbr']:self.depth+=1
            return
        if 'lang-switch' in d.get('class','').split():self.ignore='switch';self.depth=1;return
        if tag in ['script','style']:self.ignore=tag;return
        if tag=='link' and d.get('rel')=='stylesheet':return
        self.tokens.append((tag,attrs))
        self.text.extend(v for k,v in attrs if k in ['alt','title','aria-label','placeholder'] and v)
    def handle_endtag(self,tag):
        if self.ignore:
            if self.ignore in ['script','style'] and tag==self.ignore:self.ignore=None
            elif self.ignore=='switch':
                self.depth-=1
                if self.depth==0:self.ignore=None
            return
        self.tokens.append(('/'+tag,))
    def handle_data(self,text):
        if not self.ignore and text.strip():
            text=re.sub(r'\s+',' ',text).strip();self.text.append(text);self.tokens.append(('text',text))

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--base',default='/');parser.add_argument('--baseline',type=Path);args=parser.parse_args()
    root=Path(__file__).resolve().parents[2];dist=root/'dist';base=args.base
    routes=['/'+str(p.relative_to(root/'src/pages')).removesuffix('index.astro') for p in (root/'src/pages').rglob('index.astro') if p.relative_to(root/'src/pages').parts[0] not in ['en','it']]
    assert len(routes)==32, f'Unexpected source route count: {len(routes)}'
    checked=0;link_count=0
    for route in routes:
        for lang in ['fr','en','it']:
            prefix='' if lang=='fr' else lang+'/'
            file=dist/prefix/route.lstrip('/')/'index.html';assert file.exists(),file
            page=Page(file.read_text());assert page.lang==lang,(file,page.lang)
            assert page.canonical=='https://lesgrandsraidsaski.com/'+prefix+route.lstrip('/'),(file,page.canonical)
            for target in ['fr','en','it']:
                p='' if target=='fr' else target+'/'
                expected='https://lesgrandsraidsaski.com'+base+p+route.lstrip('/')
                assert page.alternates.get(target)==expected,(file,target,page.alternates)
            assert page.alternates.get('x-default')==page.alternates['fr'],file
            assert all(v==lang for v in page.locales),(file,page.locales)
            for a in page.links:
                href=a.get('href','');url=urlsplit(href)
                if url.scheme or url.netloc or not url.path:continue
                if not url.path.startswith(base):continue
                local=url.path[len(base):]
                if not local or local.endswith('/'):
                    assert (dist/unquote(local)/'index.html').exists(),(file,'broken route',href)
                if lang!='fr' and ('/'+local) in routes and a.get('hreflang')!='fr':
                    raise AssertionError((file,'unlocalised internal link',href))
                link_count+=1
            if lang=='fr' and args.baseline:
                original=Page((args.baseline/route.lstrip('/')/'index.html').read_text())
                assert page.tokens==original.tokens,('Changed French markup',route)
            if lang!='fr':
                # French brand and local place/hut names are deliberately retained.
                residual=re.findall(r'\b(?:avec|prochains|itinérance|récit|disponibilités|dénivelé|hébergements|aujourd’hui)\b',' '.join(page.text),re.I)
                assert not residual,(file,'French text remaining',residual)
            checked+=1
    print(f'{checked} pages checked; {link_count} internal links; canonical/hreflang/form locales OK.')
    if args.baseline:print('French body and metadata unchanged (excluding expected language-switch/hreflang updates and style/script packaging).')
if __name__=='__main__':main()
