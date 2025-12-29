export default {
 async fetch(req, env){
  const u=new URL(req.url);
  if(u.pathname==='/api/videos'){
   const d=await env.VIDEOS.get('list')||'{"videos":[]}';
   return new Response(d,{headers:{'Content-Type':'application/json','Cache-Control':'public, max-age=3600'}});
  }
  if(u.pathname==='/api/generate'){
   const b=await req.json();
   if(b.key!==env.ADMIN_KEY) return new Response('Forbidden',{status:403});
   const data=JSON.parse(await env.VIDEOS.get('list')||'{"videos":[]}');
   data.videos.push({title:b.title,url:b.url,time:Date.now()});
   await env.VIDEOS.put('list',JSON.stringify(data));
   return new Response('OK');
  }
  return new Response('Not Found',{status:404});
 }
}
