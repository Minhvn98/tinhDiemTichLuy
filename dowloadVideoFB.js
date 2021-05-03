function downloadFacebookVideo(){
  var commentQuery = 'comment_id';
  var url = window.location.href;
  if(url.indexOf('?' + commentQuery + '=') != -1)
    return downloadCommentVideo();
  else if(url.indexOf('&' + commentQuery + '=') != -1)
    return downloadCommentVideo();
  return downloadNormalVideo();
}
function downloadCommentVideo(){
  let str = document.documentElement.outerHTML;
  let regex_video_source =  /"edges":\[{(.*?)],"page_info"/gm;
  let regex_video_match_sd = /"playable_url":"(.*?)"/m;
  let regex_video_match_hd = /"playable_url_quality_hd":"(.*?)"/m;
  
  let comment_video_source = null;
  let comment_video_match_sd = null;
  let comment_video_match_hd = null;
  
while ((m = regex_video_source.exec(str)) !== null) {
   comment_video_source = (typeof(m[1]) != "undefined") ? m[1] : null;
   break;
}
if(comment_video_source == null){
  console.log('Không thể lấy Video từ Comment này !');
  return;
}
while ((m = regex_video_match_sd.exec(comment_video_source)) !== null) {
    comment_video_match_sd = (typeof(m[1]) != "undefined") ? m[1] : null;
     break;
}
while ((m = regex_video_match_hd.exec(comment_video_source)) !== null) {
    comment_video_match_hd = (typeof(m[1]) != "undefined") ? m[1] : null;
     break;
}

  if(comment_video_match_sd == null && comment_video_match_hd == null){
  console.log("Không tìm thấy link nào !");
  return;
  }
  let output = "Ấn vào link bên dưới để tải về : \n";
if(comment_video_match_sd != null){
   let link = comment_video_match_sd.replaceAll("\\","");
   let link_final = link.replaceAll("amp;","");
   console.log(" ✔ Link SD: " + link_final);
}
if(comment_video_match_hd != null){
   let link = comment_video_match_hd.replaceAll("\\","");
   let link_final = link.replaceAll("amp;","");
  console.log("✔ Link HD: " + link_final);
}
str = null;
return 'Ấn vào link bên trên để tải về nhé!';
}

function downloadNormalVideo(){
let m;
let str = document.documentElement.outerHTML;
let regex_sd = /"playable_url":"([^"]*)"/gm;
let regex_hd = /"playable_url_quality_hd":"([^"]*)"/gm;
let regex_audio = /"audio":\[(.*?)\]/sm; // Tach audio ra
let regex_audio_url = /{"url":"(.*?)\",/;  // Lay chuoi Audio dau tien
// Audio
let video_sd_url = null;
let video_hd_url = null;
let audio_json = null;
let audio_url = null;

// Lay Link SD
while ((m = regex_sd.exec(str)) !== null) {
   video_sd_url = (typeof(m[1]) != "undefined") ? m[1] : null;
    break;
}
// Lay Link HD
while ((m = regex_hd.exec(str)) !== null) {
   video_hd_url = (typeof(m[1]) != "undefined") ? m[1] : null;
      break;
}
/* Bat dau lay Audio */
// Audio Json
if ((m = regex_audio.exec(str)) !== null) {
    audio_json = (typeof(m[1]) != "undefined") ? m[1] : null;
}
// Audio URL
if (audio_json != "null" && (m = regex_audio_url.exec(audio_json)) !== null ) {
    audio_url = (typeof(m[1]) != "undefined") ? m[1] : null;
}
/* Ket thuc lay Audio */

// Tra loi neu khong co ket qua khi ca 3 ko co
if(video_hd_url == null && video_sd_url == null && audio_url == null){
  console.log("Không tìm thấy link nào !");
  return;
}


// Link SD
if(video_sd_url != null){
   let sd = video_sd_url.replaceAll("\\","");
  console.log("✔ Chất lượng SD : " + sd);
}
// Link HD
if(video_hd_url != null){
   let hd = video_hd_url.replaceAll("\\","");
  console.log("✔ Chất lượng HD : " + hd);
}
// Link Audio
if(audio_url != null){
   let audio = audio_url.replaceAll("\\","");
 console.log("✔ Link Audio: " + audio );
}
str = null;
return 'Ấn vào link bên trên để tải về nhé!';
}
