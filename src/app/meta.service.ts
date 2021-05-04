import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

export const SiteName = 'S2 Geometry sandbox';
export const SiteDescription = 'S2 Geometry library sandbox'; // FIXME
export const SiteLocale = 'ja_JP';
export const SiteOrigin = 'https://s2-sandbox.tach.dev';

export function NewMetas(
  a: {
    ogTitle: string,
    ogLocale: string,
    ogDescription: string,
    ogUrl: string,
    ogSiteName: string,
    ogType: string,
    ogImage?: string,
    description: string,
  },
): Array<MetaDefinition> {
  const r: Array<MetaDefinition> = [];
  if (a.ogTitle) { r.push({ property: 'og:title', content: a.ogTitle }); }
  if (a.ogType) { r.push({ property: 'og:type', content: a.ogType }); }
  if (a.ogLocale) { r.push({ property: 'og:locale', content: a.ogLocale }); }
  if (a.ogDescription) { r.push({ property: 'og:description', content: a.ogDescription }); }
  if (a.ogUrl) { r.push({ property: 'og:url', content: a.ogUrl }); }
  if (a.ogSiteName) { r.push({ property: 'og:site_name', content: a.ogSiteName }); }
  if (a.ogImage) { r.push({ property: 'og:image', content: a.ogImage }); }
  if (a.description) { r.push({ name: 'description', content: a.description }); }
  return r;
}

export const FixedMetasDefault: Array<MetaDefinition> = NewMetas({
  ogDescription: SiteDescription,
  ogTitle: SiteName,
  ogLocale: SiteLocale,
  ogUrl: SiteOrigin,
  ogSiteName: SiteName,
  ogType: 'website',
  description: SiteDescription,
});

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private meta: Meta,
  ) { }

  setMetas(a: Array<MetaDefinition>): void {
    a.forEach(v => {
      this.meta.updateTag(v);
    });
  }
}