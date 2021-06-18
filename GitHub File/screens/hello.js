

let currentdate = new Date();
console.log("what is the chatid value ", currentdate)



           
//console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa ", newImage)
if (this.state.checkid == true) {
    this.setState({
        text: "Sending.."
    })
    let uploaddata = new FormData();
 let chatid1 = this.state.chatid
 console.log("check => ",chatid1)
 let message = this.state.message
 let senderid = this.state.id
 let receiverid = this.props.vendorid
        uploaddata.append('chat_id',chatid1);
        uploaddata.append('message',message);
        uploaddata.append('sender_id',senderid);
        uploaddata.append('receiver_id',receiverid);
        uploaddata.append('message_image',newImage);
        uploaddata.append('date',currentdate.toString());
  
   // console.log("chatid ", this.state.chatid, " message ", this.state.message, "user_id ", this.state.id,"vendor_id ",this.props.vendorid)
    let api = Connection + 'action=send_new_message';
      // console.log("api => ",api)
    fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo",
        },
        body: uploaddata,
    })
        .then((response) => response.json())
        .then((json) => {
           console.log(json.response);

            if (json.response == "fail") {

                alert("network Fail")

            }
            else {
                this.setState({
                    message: '',
                    text: "Send",
                    
                })
                //let token = this.props.token
                //console.log(token)
                //this.SendNotification();
               // this.getexistingchat();

            }
        })
        .catch((error) => {
            console.error(error);
        })
}








this.setState({
  text: "Sending.."
})
let uploaddata = new FormData();
let vendorid = this.props.vendorid
let message = this.state.message
let senderid = this.state.id
let productid = this.props.productid
     uploaddata.append('vendor_id',vendorid);
     uploaddata.append('message',message);
     uploaddata.append('user_id',senderid);
     uploaddata.append('product_id',productid);
     uploaddata.append('date',currentdate.toString());
     uploaddata.append('message_image',newImage);
     
//console.log("vendor_id ", vendorid, " message ", message, "user-id ", senderid,"message_image ",newImage,"date ",currentdate)
let api = Connection +'action=send_message_for_product';
// console.log("vendor => ",this.props.vendorid)
// console.log("message => ",this.state.message)
// console.log("user id => ",this.state.id)
// console.log("product id => ",this.props.productid)
console.log("api => ",api)  
fetch(api, {
  method: 'POST',
  headers: {
      "Content-Type": "multipart/form-data",
      "otherHeader": "foo",
  },
  body: uploaddata,
})
  .then((response) => response.json())
  .then((json) => {
      console.log("chatid is =>")
      console.log(json.response);
    

      if (json.response == "fail") {

          alert("network Fail")

      }
      else {
          this.setState({
              message: '',
              text: "Send",
              checkid:true,
              
              chatid:json.response
          })
          //let token = this.props.token
          //console.log(token)
          //this.SendNotification();
          //this.getexistingchat();

      }
  })
  .catch((error) => {
      console.error(error);
  })






















  