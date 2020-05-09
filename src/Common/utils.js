/* localstorage get */
export function get (data){
   const result = localStorage.getItem(data);

   try {
      return JSON.parse(result);
   } catch (e) {
      return result;
   }
}

/* localstorage set */
export function set (name, data){

   localStorage.setItem(name, JSON.stringify(data));
}

export async function sleep (time){

   return new Promise((resolve)=>{

      setInterval(()=>{
         resolve();
      },time);
   });
}
