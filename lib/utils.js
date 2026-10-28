export const utils={
 money:n=>'$'+Number(n||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}),
 date:d=>d?new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):'',
 strip:html=>(html||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(),
 excerpt:(html,len=160)=>{const text=utils.strip(html);return text.length>len?text.slice(0,len).trim()+'…':text;},
 ytThumb:url=>{const m=(url||'').match(/(?:youtube\.com\/shorts\/|youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);return m?'https://img.youtube.com/vi/'+m[1]+'/hqdefault.jpg':null;}
};
