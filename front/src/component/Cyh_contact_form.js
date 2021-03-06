import React from 'react';
import axios from 'axios';
import $ from 'jquery';

export default function Cyh_interview_new(props) {
    const submitClick = (type, e) => {
        const  fnValidate = (e) =>{
                if(!$('#agreeTerm').is(':checked')){   
                    alert("동의하시게나");
                    $('label[for="agreeTerm"]').addClass('notice');                 
                    return false;
                }else{

                    return true;
                }
                        
              }
          var time = new Date(); 
         
          if(fnValidate()){ // 동의했기때문에 데이터 모아서 이제 비동기로 노드한테 보내야겟다
           
            var  jsonstr = decodeURIComponent($("[name='"+props.botable+"']").serialize());           
            var  json_form = JSON.stringify(jsonstr).replace(/\&/g, '\",\"') 
            json_form = "{\""+ json_form.replace(/=/gi, '\":\"') + "\"}" 
            
            try{
                axios({
                    url :`/cyhpreinterview?type=${props.botable}`,
                    header:{
                        "Content-Type" : 'application/json',
                    },
                    method :"POST",
                    body : json_form
                })
                .then(
                    (result) => {

                        // select 전용
                        try{
                            console.log(result)
                        }
                        catch(err){ console.log("reult 타입 확인할 것 : " + err.message + " / " + typeof result) }  // result가 들어왔는데 try처럼 안왔을때 에러 발생
                    }
                )
            }
            catch(err){
                console.log(" 서버통신 문제가 있네 좀있다가 다시 시도해: "+err)
            }
          }
           // e.preventDefault();       
    }
  return (
    <div id='formcon'>
         <h2>{ props.titlenm }</h2>
            <form  action=''  method='post' name={props.botable}>
                <div className='formStyle'>
                    <dl>                            
                        <dt><label htmlFor='wr_subject'>인터뷰제목</label></dt>
                        <dd>
                            <input type='text' name='wr_subject' id="wr_subject" required />
                        </dd>
                    </dl>
                    <dl>
                        <dt><label htmlFor="wr_content">인터뷰내용</label></dt>
                        <dd>
                            <textarea rows={5} name="wr_content" id="wr_content"  required >

                            </textarea>
                        </dd>
                    </dl>
                    <div className="agree">
                        <input type="checkbox" id="agreeTerm" />
                        <label htmlFor="agreeTerm"><span>개인정보정책동의</span></label>
                    </div>
                    <a href="#none" onClick={e => { submitClick(props.botable, e) }}  className='btn' > 인터뷰올리기 </a>
                </div>
            </form> 
    </div>
  )
}