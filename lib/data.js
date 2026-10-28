import { cache } from 'react';
import { getSupabase } from './supabase';
import * as seed from './seed';
export { utils } from './utils';

async function fromTable(table, fallback) {
 const sb=getSupabase();
 if(!sb) return fallback;
 const {data,error}=await sb.from(table).select('*').order('created_at',{ascending:false});
 if(error) { console.error('Content load failed:',table,error.code); throw new Error('We could not load this content. Please try again shortly.'); }
 return data||[];
}
export const getSite=cache(async()=>{
 const sb=getSupabase();
 if(!sb) return seed.SITE;
 const {data,error}=await sb.from('site_settings').select('*').eq('id',1).maybeSingle();
 if(error) {console.error('Site settings load failed:',error.code);throw new Error('We could not load the site settings.');}
 return data||seed.SITE;
});
export const getPackages=cache(()=>fromTable('packages',seed.PACKAGES));
export const getDestinations=cache(()=>fromTable('destinations',seed.DESTINATIONS));
export const getServices=cache(()=>fromTable('services',seed.SERVICES));
export const getTeam=cache(()=>fromTable('team',seed.TEAM));
export const getNews=cache(()=>fromTable('news',seed.NEWS));
export const getBlogPosts=cache(()=>fromTable('blog_posts',seed.BLOG_POSTS));
export const getGallery=cache(()=>fromTable('gallery',seed.GALLERY));
export async function getPost(table,id,fallback) {
 const sb=getSupabase();
 if(!sb) return fallback.find(p=>String(p.id)===String(id))||null;
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return null;
 const {data,error}=await sb.from(table).select('*').eq('id',id).maybeSingle();
 if(error) {console.error('Content load failed:',table,error.code);throw new Error('We could not load this page.');}
 return data;
}
export const getPackage=cache(id=>getPost('packages',id,seed.PACKAGES));
