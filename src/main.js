const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A",  url: "https://www.acfun.cn" },
  { logo: "B",  url: "https://www.bilibili.com",},
  { logo: "C",   url: "https://www.csdn.net" },
];
const simplifyUrl=(url)=>{
  return url.replace('https://','')
      .replace('http://','')
      .replace('www.','')
      .replace(/\/.*/,'')
}
const hf = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node,index) => {

    const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <img src="/close.f83dd5e1.png" class="img2" />
            </div>
        </div>
  </li>`).insertBefore($lastLi);
      $li.on('click',()=>{
        window.open(node.url,'_self')
      })
      $li.on('click','.close',(e)=>{
        e.stopPropagation()
        hashMap.splice(index,1)
        hf()
      })
  });
};
hf();
$(".addButton").on("click", () => {
  let url = window.prompt("输入新增网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
  });
  hf();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
$(document).on(`keypress`,(e)=>{
  const {key}=e
  for (let i=0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase()===key){
      window.open(hashMap[i].url,'_self')
    }
  }

})