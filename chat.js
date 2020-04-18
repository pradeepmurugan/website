
let messagesCount = 1;

let socket = "";
var ChatSessionId = "";
let chatToken = "";
let chatRoomId = "";
let msgCustmrName = "";
let roomSubId = generateHash(17);
let awsUrl = 'https://pnehj3jubf.execute-api.us-east-1.amazonaws.com/Dev/';
let clientchatid = "";
let organizationname = "";
var userName = "";
var clientChatBot = "";

var Today = new Date().toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' });

var cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId)) {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.id = cssId;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'https://clientchatdev.s3.amazonaws.com/chatwidget/style.css';
	//link.href = 'style.css';
	link.media = 'all';
	head.appendChild(link);
}

var cssId = 'myCss1';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId)) {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.id = cssId;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'https://fonts.googleapis.com/css?family=Droid+Sans:400,700';
	link.media = 'all';
	head.appendChild(link);
}

var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function fnCreateChatForm(fromName) {
	var form = document.createElement("form");
	form.setAttribute('name', fromName);
	form.setAttribute('id', fromName);
	form.setAttribute('method', "post");
	return form;
}

function fnQusbtnCreate(name) {
	var btnCreate = document.createElement("input"); //input element, button
	btnCreate.setAttribute('type', "button");
	btnCreate.setAttribute('name', "btnTrackOrder");
	btnCreate.setAttribute('id', "btnTrackOrder");
	btnCreate.setAttribute('class', "button btn-track");
	btnCreate.setAttribute('value', name);
	btnCreate.setAttribute('onclick', "QuestrackOrderScreen('" + name + "')");
	return btnCreate;
}

function fnChatbtnTransAgent(name) {
	var btnTransAgent = document.createElement("input"); //input element, button
	btnTransAgent.setAttribute('type', "button");
	btnTransAgent.setAttribute('name', "btnTransAgent");
	btnTransAgent.setAttribute('id', "btnTransAgent");
	btnTransAgent.setAttribute('class', "button btn-transfer");
	btnTransAgent.setAttribute('value', name);
	btnTransAgent.setAttribute('onclick', "liveAgentScreen('" + name + "')");
	return btnTransAgent;
}

function fnCreateInputBox(inputData,type) {
	var txtName = document.createElement("input"); //input element, Name
	txtName.setAttribute('type', type);
	txtName.setAttribute('name', inputData);
	txtName.setAttribute('id', inputData);
	txtName.setAttribute('class', "txt_field");
	//txtName.textContent = "required";
	txtName.setAttribute('autofocus', "true");
	return txtName;
}

function fntxtBlueleapChat() {
	//var txtBlueleapChat = document.createElement("textarea"); //input element, Name
	var txtBlueleapChat = document.createElement("input");
	txtBlueleapChat.setAttribute('type', "text");
	txtBlueleapChat.setAttribute('name', "blueleapchattext");
	txtBlueleapChat.setAttribute('id', "blueleapchattext");
	//txtBlueleapChat.setAttribute('onkeypress', "if (window.event.keyCode == 13) enterBlueleapChatText()");
	//txtBlueleapChat.onkeypress = function() {enterBlueleapChatText();};
	return txtBlueleapChat;
}
function sendButton()
{
	var submitbtn = document.createElement("input"); //input element, text
    submitbtn.setAttribute('type',"button");
	//submitbtn.setAttribute('value',"Send");
	submitbtn.setAttribute('class',"button btn-continue");
	submitbtn.setAttribute('id',"sendButton");
    submitbtn.setAttribute('onclick',"sendQuestionMsg()");
	return submitbtn;
}
function fnchatMessageSpan(timeData) {
	var chatMessageSpan = document.createElement("span");
	chatMessageSpan.setAttribute('class', "chat-time");
	chatMessageSpan.setAttribute('id', "chat-time");
	chatMessageSpan.innerText = timeData;
	return chatMessageSpan;
}

function fnchatMessageP(pMsgData) {
	var chatMessageP = document.createElement("p");
	chatMessageP.innerText = pMsgData;
	return chatMessageP;
}

function fnchatMessageH5(uMsgData) {
	var chatMessageH5 = document.createElement("h5");
	chatMessageH5.setAttribute('id', "chat-name");
	chatMessageH5.innerText = uMsgData;
	return chatMessageH5;
}

function fnchatMessageDiv() {
	var chatMessageDiv = document.createElement("div");
	chatMessageDiv.setAttribute('class', "chat-message clearfix");
	return chatMessageDiv;
}

function fnchatMessageContent() {
	var chatMessageContent = document.createElement("div");
	chatMessageContent.setAttribute('class', "chat-message-content clearfix");
	return chatMessageContent;
}

function fnChatMsgRow(divId, msgTime, msgUser, msgBody) {
	var chatMessageDiv = fnchatMessageDiv();
	var chatMessageContent = fnchatMessageContent();
	chatMessageContent.setAttribute('id', divId);

	var chatMessageSpan = fnchatMessageSpan(msgTime);
	var chatMessageH5 = fnchatMessageH5(msgUser);
	var chatMessageP = fnchatMessageP(msgBody);

	chatMessageContent.appendChild(chatMessageSpan);
	chatMessageContent.appendChild(chatMessageH5);
	chatMessageContent.appendChild(chatMessageP);
	chatMessageDiv.appendChild(chatMessageContent);

	var chatHistory = document.getElementById('chatHistory');
	chatHistory.appendChild(chatMessageDiv);

	//if(msgUser ==  "Bot")
	//{
		var objDiv = document.getElementById("chatHistory");
    	objDiv.scrollTop = objDiv.scrollHeight;
	//}

	return chatHistory;
}

async function chatWidget() {
	var sendChatid = {
		clientChatId: clientchatid,
		organizationName:organizationname
	};
	let response = await fetch(awsUrl, {
		method: "POST",
		body: JSON.stringify(sendChatid)
	});
	var getProfile = await response.json();
	console.log("GET PROFILE",getProfile);
	/*if(getProfile.statusCode != 200)
	{
		 alert(getProfile.errorMessage);
	}
	else
	{*/
		var profileIcon= (getProfile.body== undefined) ? "" : getProfile.body.clientChatIcon;
		//var profileIcon=""; //getProfile.body.clientChatIcon;
		//var profileName=""; //getProfile.body.clientChatText;
		var profileName= (getProfile.body== undefined) ? "" : getProfile.body.clientChatText; //getProfile.body.clientChatText;
		//clientChatBot = ""; //getProfile.body.clientChatBot;
		clientChatBot = (getProfile.body== undefined) ? "" : getProfile.body.clientChatBot; //getProfile.body.clientChatBot;
		//console.log("PN",profileName);
		console.log("profileName", profileName);
		var headerdiv = document.createElement("div");
		headerdiv.setAttribute('id', "live-chat");
		headerdiv.setAttribute('class', "bg-white");
	
		var headerdivHeader = document.createElement("header");
		headerdivHeader.setAttribute('class', "clearfix");
		headerdivHeader.setAttribute('id', "chatHeader");
		headerdivHeader.onclick = function() {chatHeaderClick();};
	
		var headerdivH4 = document.createElement("h4");
		var imgIcon = document.createElement('img');
		imgIcon.setAttribute('id', "imgIcon");
		//headerdivH4.innerText = "Blueleap Chat"
		if(profileName=="" || profileName==null || profileName==undefined)
		{
			headerdivH4.innerText = "Blueleap Chat";
			imgIcon.src="https://clientchatdev.s3.amazonaws.com/chatwidget/leapBot.svg"
		}
		else{
			headerdivH4.innerText = profileName;
			imgIcon.src=profileIcon;
		}
	
	
		var chatdiv = document.createElement("div");
		chatdiv.setAttribute('class', "chat");
		chatdiv.setAttribute('id', "chatId");
	
		var form = fnCreateChatForm("frmBlueleapChatWidget");
		var formFieldsetName = document.createElement("fieldset");
		formFieldsetName.setAttribute('class', "cont");
	
		var txtName = fnCreateInputBox("txtBlueleapName","text");
		txtName.setAttribute('placeholder', "Name*");
		txtName.setAttribute("required", "");
		
		var spanBlueleapName = document.createElement('span');
		spanBlueleapName.setAttribute('class', 'spanErrorMsg');
		spanBlueleapName.setAttribute('id', 'spanBlueleapName');
		spanBlueleapName.innerHTML = "";
	
		var txtEmail = fnCreateInputBox("txtBlueleapEmail","email");
		txtEmail.setAttribute('placeholder', "Email*");
		txtEmail.setAttribute("required", "");
		
		var spanBlueleapEmail = document.createElement('span');
		spanBlueleapEmail.setAttribute('class', 'spanErrorMsg');
		spanBlueleapEmail.setAttribute('id', 'spanBlueleapEmail');
		spanBlueleapEmail.innerHTML = "";
	
		var submitBtn = document.createElement("input"); //input element, button
		submitBtn.setAttribute('type', "button");
		submitBtn.setAttribute('name', "btnFrm");
		submitBtn.setAttribute('id', "btnFrm");
		submitBtn.setAttribute('value', "Start Chat");
		submitBtn.setAttribute('class', "button btn-start");
		submitBtn.setAttribute('onclick', "secondScreen()");
	
		headerdivHeader.appendChild(imgIcon);
		headerdivHeader.appendChild(headerdivH4);
		formFieldsetName.appendChild(txtName);
		formFieldsetName.appendChild(spanBlueleapName);
		formFieldsetName.appendChild(txtEmail);
		formFieldsetName.appendChild(spanBlueleapEmail);
		form.appendChild(formFieldsetName);
		chatdiv.appendChild(form);
		chatdiv.appendChild(submitBtn);
		headerdiv.appendChild(headerdivHeader);
		headerdiv.appendChild(chatdiv);
		document.body.appendChild(headerdiv);
	/*}*/
}

async function secondScreen() {
	var btnFrmElem = document.getElementById("btnFrm");
	btnFrmElem.disabled = true
	btnFrmElem.value="Loading...";
	btnFrmElem.classList.add("loading");
	
	var frmValidate = document.querySelector('#frmBlueleapChatWidget').reportValidity();
	if(frmValidate == false)
	{
		Name = document.getElementById("txtBlueleapName").value;
		Email = document.getElementById("txtBlueleapEmail").value;
		if(Name == "" && Email== "")
		{
			document.getElementById("txtBlueleapName").style.border="1px solid #e62727";
			document.getElementById("spanBlueleapName").innerHTML = "Name is required";
			
			document.getElementById("txtBlueleapEmail").style.border="1px solid #e62727";
			document.getElementById("spanBlueleapEmail").innerHTML = "Email is required";
		}
		else if(Name== "")
		{
			document.getElementById("txtBlueleapName").style.border="1px solid #e62727";
			document.getElementById("txtBlueleapEmail").style.border="1px solid #a9d7ff";
		}
		else if(Email== "")
		{
			document.getElementById("txtBlueleapEmail").style.border="1px solid #e62727";
			document.getElementById("txtBlueleapName").style.border="1px solid #a9d7ff";
		}
		/*else
		{
			document.getElementById("txtBlueleapName").style.border="1px solid #a9d7ff";
			document.getElementById("txtBlueleapEmail").style.border="1px solid #a9d7ff";
		}*/
		btnFrmElem.disabled = false;
		btnFrmElem.classList.remove("loading");
		btnFrmElem.value="Start Chat";
		return false;
	}
	else if((frmValidate == true) && (validateEmail(document.getElementById("txtBlueleapEmail").value) == false))
	{
		document.getElementById("txtBlueleapEmail").style.border="1px solid #e62727";
		document.getElementById("spanBlueleapEmail").innerHTML = "Invalid Email";
		
		btnFrmElem.disabled = false;
		btnFrmElem.classList.remove("loading");
		btnFrmElem.value="Start Chat";
		return false;
	}
	else
	{
			var randNum = Math.floor((Math.random() * 10000000000) + 1);
			var chatID = randNum.toString();
			msgCustmrName = document.getElementById("txtBlueleapName").value;
			var CustmrEmail = document.getElementById("txtBlueleapEmail").value;
			var dataSet = {
			ChatSessionId: chatID,
			customerName: msgCustmrName,
			emailId: CustmrEmail,
			msg: "",
			isTransfered: false,
			clientChatId: clientchatid,
			organizationName:organizationname
			};
			// console.log("dataSet", dataSet)
			let response = await fetch(awsUrl, {
			method: "POST",
			body: JSON.stringify(dataSet)
			});
			var body = await response.json();
			console.log("body", body);
			
			if(body.statusCode != 200)
			{
				var resBody = (body.hasOwnProperty('errorMessage') == false)? "Our server is not responding now.Please try later.":body.errorMessage; 
				
				resBody = (resBody == true) ? "Our server is not responding now.Please try later." : resBody; //Temporary Solution.
				
				var form = document.getElementById("frmBlueleapChatWidget");
				form.remove();
				
				var startChatButton = document.getElementById("btnFrm");
				startChatButton.remove();
				
				var chatHistorydiv = document.createElement("div");
				chatHistorydiv.setAttribute('class', "chat-history");
				chatHistorydiv.setAttribute('id', "chatHistory");
				
				
				var chatMessageDiv = fnchatMessageDiv();
				var chatMessageContent = fnchatMessageContent();
				chatMessageContent.setAttribute('id', "chat-message-bot");
			
				var chatMessageSpan = fnchatMessageSpan(Today);
				var chatMessageH5 = fnchatMessageH5(clientChatBot);
				var chatMessageP = fnchatMessageP(resBody);
			
				chatMessageContent.appendChild(chatMessageSpan);
				chatMessageContent.appendChild(chatMessageH5);
				chatMessageContent.appendChild(chatMessageP);
				chatMessageDiv.appendChild(chatMessageContent);
			
				var chatHistory = document.getElementById('chatHistory');
				chatHistorydiv.appendChild(chatMessageDiv);
				
				var chatdiv = document.getElementById("chatId");
				chatdiv.appendChild(chatHistorydiv);
				
				var lastDiv = document.querySelectorAll(".chat-message-content");
				var lastDivIndex = (lastDiv.length -1);
				var pTag =lastDiv[lastDivIndex].getElementsByTagName("p");
				pTag[0].style.color = "#F00";
			}
			else
			{
				ChatSessionId = body.chatId;
				var questionBtn = body.body.questions;
				var chatBtn = body.body.chat;
				
				var form = document.getElementById("frmBlueleapChatWidget");
				form.remove();
				
				var startChatButton = document.getElementById("btnFrm");
				startChatButton.remove();
				
				var chatHistorydiv = document.createElement("div");
				chatHistorydiv.setAttribute('class', "chat-history");
				chatHistorydiv.setAttribute('id', "chatHistory");
				
				for (let index = 0; index < questionBtn.length; index++) {
				const element = questionBtn[index];
				// console.log(element);
				var QusbtnCreate = fnQusbtnCreate(element);
				chatHistorydiv.appendChild(QusbtnCreate);
				}
				var chatbtnCreate = fnChatbtnTransAgent(chatBtn);
				
				var chatdiv = document.getElementById("chatId")
				chatHistorydiv.appendChild(chatbtnCreate);
				chatdiv.appendChild(chatHistorydiv);
			}
	}
}

async function QuestrackOrderScreen(dataName) {
	//alert(awsUrl+"-"+dataName+"-"+ChatSessionId+"-Ques-"+clientchatid);
	var dataSet = {
		ChatSessionId: ChatSessionId,
		msg: dataName,
		clientChatId: clientchatid
	};
	let response = await fetch(awsUrl, {
		method: "POST",
		body: JSON.stringify(dataSet)
	});
	var body = await response.json();
	console.log("body", body);
	
	fnChatMsgRow("chat-message-user", Today, msgCustmrName, dataName); //
	
	if(body.statusCode != 200)
	{ 
		var resBody = (body.hasOwnProperty('errorMessage') == false)? "Our server is not responding now, please try later.":body.errorMessage; 
		var btnTrackOrder = document.getElementsByClassName("btn-track");
		for (var i = 0; i < btnTrackOrder.length; i++) {
		btnTrackOrder[i].style.display = 'none';
		}
		var btnTransAgent = document.getElementsByClassName("btn-transfer");
		for (var j = 0; j < btnTransAgent.length; j++) {
		btnTransAgent[j].style.display = 'none';
		}
		
		//fnChatMsgRow("chat-message-user", Today, msgCustmrName, dataName); //
		
		fnChatMsgRow("chat-message-bot", Today, clientChatBot, resBody);
		
		var lastDiv = document.querySelectorAll(".chat-message-content");
		var lastDivIndex = (lastDiv.length -1);
		var pTag =lastDiv[lastDivIndex].getElementsByTagName("p");
		pTag[0].style.color = "#F00";
		
		var txtBlueleapChatBot = fntxtBlueleapChat();
		var send=sendButton();
		var chatBtnView = document.getElementById("chatBtn");
		if (chatBtnView) {
		chatBtnView.remove();
		}
		var form = document.getElementById("blueleapchatwidget");
		if (form) {
		form.remove();
		}
		
		var dataSetNew = {
		ChatSessionId: ChatSessionId,
		msg: "",
		clientChatId: clientchatid
		};
		let responseNew = await fetch(awsUrl, {
		method: "POST",
		body: JSON.stringify(dataSetNew)
		});
		var bodyNew = await responseNew.json();
		//console.log("bodyNew", bodyNew);
		var questionBtn = bodyNew.body.questions;
		var chatBtn = bodyNew.body.chat;
		var chatBtndiv = document.createElement("div");
		chatBtndiv.setAttribute('class', "chat-button");
		chatBtndiv.setAttribute('id', "chatBtn");
		for (let index = 0; index < questionBtn.length; index++) {
		const element = questionBtn[index];
		var QusbtnCreate = fnQusbtnCreate(element);
		chatBtndiv.appendChild(QusbtnCreate);
		}
		
		var chatdiv = document.getElementById("chatId");
		var chatbtnCreate = fnChatbtnTransAgent(chatBtn);
		
		chatBtndiv.appendChild(chatbtnCreate);
		chatdiv.appendChild(chatBtndiv);
		
		/*form = fnCreateChatForm("blueleapchatwidget");
		var formFieldsetChatText = document.createElement("fieldset");
		formFieldsetChatText.appendChild(txtBlueleapChatBot);
		formFieldsetChatText.appendChild(send);
		form.appendChild(formFieldsetChatText);
		chatdiv.appendChild(form);
		enableEnterKeyBtn();*/
	}
	else
	{
		var resBody = body.body;
		var btnTrackOrder = document.getElementById("chatHistory").getElementsByClassName("btn-track");
		//document.getElementsByClassName("btn-track");
		for (var i = 0; i < btnTrackOrder.length; i++)
		{ 
		   if(btnTrackOrder[i].style.display == '')
		   {
			   btnTrackOrder[i].style.display = 'none';
		   }
		}
		var btnTransAgent = document.getElementById("chatHistory").getElementsByClassName("btn-transfer");
		//document.getElementsByClassName("btn-transfer");
		for (var j = 0; j < btnTransAgent.length; j++)
		{
		   if(btnTransAgent[j].style.display == '')
		   {
			   btnTransAgent[j].style.display = 'none';
		   }
		}/**/
		
		//fnChatMsgRow("chat-message-user", Today, msgCustmrName, dataName); //
		
		fnChatMsgRow("chat-message-bot", Today, clientChatBot, resBody);
		
		var txtBlueleapChatBot = fntxtBlueleapChat(); //console.log(txtBlueleapChatBot);
		var send=sendButton(); //console.log(send);
		
		/*var chatBtnView = document.getElementById("chatBtn");
		if(chatBtnView) 
		{
			chatBtnView.remove();
		}
		var form = document.getElementById("blueleapchatwidget");
		if(form) 
		{
			form.remove();
		}*/
		
		
		var dataSetNew = {
		ChatSessionId: ChatSessionId,
		msg: "",
		clientChatId: clientchatid
		};
		let responseNew = await fetch(awsUrl, {
		method: "POST",
		body: JSON.stringify(dataSetNew)
		});
		var bodyNew = await responseNew.json(); //console.log("body", bodyNew);
		
		var questionBtn = bodyNew.body.questions;
		var chatBtn = bodyNew.body.chat;
		
		
		var chatBtnView = document.getElementById("chatBtn");
		if(!chatBtnView)
		{
				var chatBtndiv = document.createElement("div");
				chatBtndiv.setAttribute('class', "chat-button");
				chatBtndiv.setAttribute('id', "chatBtn");
				for (let index = 0; index < questionBtn.length; index++) 
				{
					const element = questionBtn[index];
					var QusbtnCreate = fnQusbtnCreate(element);
					chatBtndiv.appendChild(QusbtnCreate);
				}
				
				var chatdiv = document.getElementById("chatId");
				var chatbtnCreate = fnChatbtnTransAgent(chatBtn);
				
				chatBtndiv.appendChild(chatbtnCreate);
				chatdiv.appendChild(chatBtndiv);
				
				form = fnCreateChatForm("blueleapchatwidget");
				var formFieldsetChatText = document.createElement("fieldset");
				formFieldsetChatText.appendChild(txtBlueleapChatBot);
				formFieldsetChatText.appendChild(send);
				form.appendChild(formFieldsetChatText);
				chatdiv.appendChild(form);
		}
		
		//form.appendChild(chatBtndiv);
		
		//chatdiv.appendChild(form);
		
		enableEnterKeyBtn();
	}
	
	document.getElementById("blueleapchattext").focus();
}

async function liveAgentScreen(dataName) {
	//alert(awsUrl+"-"+ChatSessionId+"-Agent-"+clientchatid);
	var dataSetNew = {
	ChatSessionId: ChatSessionId,
	msg: "",
	clientChatId: clientchatid
	};
	let responseNew = await fetch(awsUrl, {
	method: "POST",
	body: JSON.stringify(dataSetNew)
	});
	var bodyNew = await responseNew.json(); 
	var questionBtn = bodyNew.body.questions;
	var chatBtn = bodyNew.body.chat;
	//console.log("bodyNew", bodyNew);
	/**/

	var postData = {
		msg: "",
		ChatSessionId: ChatSessionId,
		isTransfered: true,
		clientChatId: clientchatid
	};

	let fetchData = await fetch(awsUrl, {
		method: "POST",
		body: JSON.stringify(postData)
	});
	var body = await fetchData.json();
	console.log("BODY",body);

	fnChatMsgRow("chat-message-user", Today, msgCustmrName, dataName);
	
	if(body.statusCode != 200)
	{
		//var resBody='Currently chat is unavailable';
		if(body.body==undefined || body.body=='undefined' || body.body==null || body.body=='null')
		{
			resBody = (body.hasOwnProperty('errorMessage') == false)? "Currently chat is unavailable.":body.errorMessage;
		}
		/*else if(getProfile.body==undefined || getProfile.body=='undefined' || getProfile.body==null || getProfile.body=='null')
		{
			resBody = 'Currently chat is unavailable';
		}*/
		else
		{
			resBody = body.body;
		}
		

		//var resBody = (body.hasOwnProperty('errorMessage') == false)? "Our executive is not available now.":body.hasOwnProperty('errorMessage'); 
		fnChatMsgRow("chat-message-bot", Today, clientChatBot, resBody);
		
		var lastDiv = document.querySelectorAll(".chat-message-content");
		var lastDivIndex = (lastDiv.length -1);
		var pTag =lastDiv[lastDivIndex].getElementsByTagName("p");
		pTag[0].style.color = "#F00";
		
		var btnTrackOrder = document.getElementById("chatHistory").getElementsByClassName("btn-track");
		for (var i = 0; i < btnTrackOrder.length; i++)
		{
		   if(btnTrackOrder[i].style.display == '')
		   {  
				btnTrackOrder[i].style.display = 'none';
		   }
		}
		var btnTransAgent = document.getElementById("chatHistory").getElementsByClassName("btn-transfer");
		for (var j = 0; j < btnTransAgent.length; j++)
		{
		   if(btnTransAgent[j].style.display == '')
		   {
				btnTransAgent[j].style.display = 'none';
		   }
		}
		
		var txtBlueleapChatAgent = fntxtBlueleapChat();
		var send=sendButton();
		
		var chatBtnView = document.getElementById("chatBtn");
		if(!chatBtnView)
		{
				var chatBtndiv = document.createElement("div");
				chatBtndiv.setAttribute('class', "chat-button");
				chatBtndiv.setAttribute('id', "chatBtn");
				for (let index = 0; index < questionBtn.length; index++) 
				{
					const element = questionBtn[index];
					var QusbtnCreate = fnQusbtnCreate(element);
					chatBtndiv.appendChild(QusbtnCreate);
				}
				
				var chatdiv = document.getElementById("chatId");
				var chatbtnCreate = fnChatbtnTransAgent(chatBtn);
				
				chatBtndiv.appendChild(chatbtnCreate);
				chatdiv.appendChild(chatBtndiv);
				
				form = fnCreateChatForm("blueleapchatwidget");
				var formFieldsetChatText = document.createElement("fieldset");
				formFieldsetChatText.appendChild(txtBlueleapChatAgent);
				formFieldsetChatText.appendChild(send);
				form.appendChild(formFieldsetChatText);
				chatdiv.appendChild(form);
		}
		
		enableEnterKeyAgent();
		
		
		/*
		var btnTrackOrder = document.getElementsByClassName("btn-track");
		for (var i = 0; i < btnTrackOrder.length; i++) {
			btnTrackOrder[i].style.display = 'none';
		}
		var btnTransAgent = document.getElementsByClassName("btn-transfer");
		for (var j = 0; j < btnTransAgent.length; j++) {
			btnTransAgent[j].style.display = 'none';
		}
	
		var chatBtnView = document.getElementById("chatBtn");
		if (chatBtnView) {
			chatBtnView.remove();
		}
		var form = document.getElementById("blueleapchatwidget");
		if (form) {
			form.remove();
		}
		
		var dataSetNew = {
		ChatSessionId: ChatSessionId,
		msg: "",
		clientChatId: clientchatid
		};
		let responseNew = await fetch(awsUrl, {
		method: "POST",
		body: JSON.stringify(dataSetNew)
		});
		var bodyNew = await responseNew.json();
		//console.log("bodyNew", bodyNew);
		var questionBtn = bodyNew.body.questions;
		var chatBtn = bodyNew.body.chat;
		var chatBtndiv = document.createElement("div");
		chatBtndiv.setAttribute('class', "chat-button");
		chatBtndiv.setAttribute('id', "chatBtn");
		for (let index = 0; index < questionBtn.length; index++) {
		const element = questionBtn[index];
		var QusbtnCreate = fnQusbtnCreate(element);
		chatBtndiv.appendChild(QusbtnCreate);
		}
		
		var chatdiv = document.getElementById("chatId");
		var chatbtnCreate = fnChatbtnTransAgent(chatBtn);
		
		chatBtndiv.appendChild(chatbtnCreate);
		chatdiv.appendChild(chatBtndiv);
		*/
		
		/*var form = document.getElementById("blueleapchatwidget");
		if (form) {
			form.remove();
		}*/
	}
	else
	{
		//var socketName = (body.body.baseUrl).replace(/^https?\:\/\//i, "");
		var socketName = "open.rocket.chat"
		// console.log("socketName", 'wss://' + socketName + '/websocket');
		let wbSockt = 'wss://' + socketName + '/websocket';
		chatRoomId = "oz6JdxXr8N4BA94Wt"
		//chatRoomId = body.body.channelId;
		userName = "pradeepmurugan"
		//userName = atob(body.body.user);
		//var userPassword = atob(body.body.password);
		var userPassword = "12345"
		//var channelName = body.body.channelName;
		var hashPassword = sha256(userPassword);
		// console.log("hashPassword", hashPassword)
	
		var btnTrackOrder = document.getElementsByClassName("btn-track");
		for (var i = 0; i < btnTrackOrder.length; i++) {
			btnTrackOrder[i].style.display = 'none';
		}
		var btnTransAgent = document.getElementsByClassName("btn-transfer");
		for (var j = 0; j < btnTransAgent.length; j++) {
			btnTransAgent[j].style.display = 'none';
		}
	
		fnChatMsgRow("chat-message-bot", Today, clientChatBot, body.body.msg);
	
		var chatBtnView = document.getElementById("chatBtn");
		if (chatBtnView) {
			chatBtnView.remove();
		}
		var form = document.getElementById("blueleapchatwidget");
		if (form) {
			form.remove();
		}
		form = fnCreateChatForm("blueleapchatwidget");
		var txtBlueleapChatAgent = fntxtBlueleapChat();
		var send=sendButton();
		var formFieldsetChatText = document.createElement("fieldset");
		formFieldsetChatText.appendChild(txtBlueleapChatAgent);
		formFieldsetChatText.appendChild(send);
		form.appendChild(formFieldsetChatText);
		var chatdiv = document.getElementById("chatId");
		chatdiv.appendChild(form);
	
		enableEnterKeyAgent();
	
		let connectObject = {
			msg: 'connect',
			version: '1',
			support: ['1', 'pre2', 'pre1'],
			id: String(messagesCount++),
		}
	
		socket = new WebSocket(wbSockt);
	
		socket.onopen = function (e) {
			socket.send(JSON.stringify(connectObject));
			let loginByToken = {
				msg: 'method',
				method: 'login',
				params: [
					{
						"user": { "username": userName },
						"password": {
							"digest": hashPassword,
							"algorithm": "sha-256"
						}
					}
				],
				id: String(messagesCount++),
			};
			socket.send(JSON.stringify(loginByToken));
	
			
			let roomNotifySub = {
				   msg: 'sub',
				   method: 'stream-notify-room',
				   id: String(roomSubId),
				   params:[
					String(chatRoomId)+'/typing',
					String(userName),
					true
				   ]
				}
			socket.send(JSON.stringify(roomNotifySub));
	
	
			let roomMessagesSub = {
				msg: 'sub',
				id: String(roomSubId),
				name: 'stream-room-messages',
				params: [
					String(chatRoomId),
					false
				]
			};
			socket.send(JSON.stringify(roomMessagesSub));
	
		};
	
		socket.onmessage = function (e) {
			let response = JSON.parse(e.data);
			console.log('response', response);
			if (response.result != undefined) {
				if (response.result.token != undefined) {
					// console.log("token", response.result.token)
					chatToken = response.result.token;
				}
			}
	
			// you have to pong back if you need to keep the connection alive
			// each ping from server need a 'pong' back
			if (response.msg == 'ping') {
				// console.log('pong!');
				socket.send(JSON.stringify({ msg: 'pong' }));
				return;
			}
	
			// here you receive messages from server //notive the event name is: 'stream-room-messages'
			if (response.msg === 'changed' && response.collection === 'stream-room-messages') {
				//console.log('msg received ', response);
				var data = {
					message: response.fields.args[0].msg,
					timestamp: response.fields.args[0].ts.$date,
					user: response.fields.args[0].u.name,
					userChatName: response.fields.args[0].u.username
				}
				addMessage(data)
				return;
			}
			
			if (response.msg === 'changed' && response.collection === 'stream-notify-room') {
				console.log('stream-notify-room ', response);
				alert(11);
			}
	
			// receive all messages which will only succeed if you already have messages
			// in the room (or in case you send the first message immediately you can listen for history correctly)
			if (response.msg === 'result' && response.result) {
				if (response.result.messages) {
					let allMsgs = response.result.messages;
					console.log('-----previous msgs---------------');
					allMsgs.map(x => console.log(x))
					console.log('---------------------------------')
				}
			}
	
		}
	}
	
	document.getElementById("blueleapchattext").focus();
}

async function sendQuestionMsg() {
	var value = document.getElementById('blueleapchattext').value;
	var removeButton = false;
	
	if(value != '')
	{
		data = {
			msg: value,
			ChatSessionId: ChatSessionId,
			clientChatId: clientchatid
		};
		fetch(awsUrl, {
			method: "POST",
			body: JSON.stringify(data)
		})
		.then(function (response) {
			return response.json();
		}).then(function (data) {
			//console.log("STATUS", data.body);
			var orderStatus = data.body;
			fnChatMsgRow("chat-message-bot", Today, clientChatBot, orderStatus);
		});
	
		if (removeButton == true) 
		{
			return false;
		}
		else 
		{
			fnChatMsgRow("chat-message-user", Today, msgCustmrName, value);
			document.getElementById('blueleapchattext').value = "";
		}
	}
}

function addMessage(message) {
	// console.log('message', message)
	let currDate = new Date(message.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
	if (message.userChatName == userName) {
		fnChatMsgRow("chat-message-user", currDate, msgCustmrName, message.message);
	}
	else {
		fnChatMsgRow("chat-message-bot", currDate, message.userChatName, message.message);
	}

}

function sendNewMsg() {
	var value = document.getElementById('blueleapchattext').value
	document.getElementById('blueleapchattext').value = "";
	let myMsg = {
		msg: 'method',
		method: 'sendMessage',
		params: [{
			_id: String(generateHash(17)),
			rid: String(chatRoomId),
			msg: value,
			token: String(chatToken),
		}],
		id: String(messagesCount++),
	}

	socket.send(JSON.stringify(myMsg));
}

function generateHash(targetLength) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < targetLength; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

/*document.addEventListener('click', function (e) {
	if (e.target && e.target.id == 'chatHeader') {
		alert(1);
		var chat = document.getElementById('chatId');
		$('.chat').slideToggle(300, 'swing');
	}
});*/

// Open / Close Chat-Box over onclick on chat header
function chatHeaderClick()
{
	$('.chat').slideToggle(300, 'swing');
}

// Not in Use
function enterBlueleapChatText() {
	var msg = document.getElementById("blueleapchattext").value;
	if(msg.trim().length != 0)
	{
		var objDiv = document.getElementById("chatHistory");
		//alert(objDiv.scrollHeight);
    	objDiv.scrollTop = objDiv.scrollHeight;
	}
}

function enableEnterKeyBtn() {
	document.getElementById('blueleapchattext').addEventListener('keypress', function (event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			sendQuestionMsg();
		}
	});
}

function enableEnterKeyAgent() {
	document.getElementById('blueleapchattext').addEventListener('keypress', function (event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			sendNewMsg();
		}
	});
}

window.onload = function () {
	// Find all script tags
	var script = document.getElementById("ze-snippet");
	var query = script.src.replace(/^[^\?]+\??/, '');
	// Parse the querystring into arguments and parameters
	var vars = query.split("&");
	var args = {};
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		// decodeURI doesn't expand "+" to a space.
		args[pair[0]] = decodeURI(pair[1]).replace(/\+/g, ' ');
	}
	var explOrg=vars[1].split("=");
	var search_term = args['clientchatid'];
	// console.log(search_term);
	clientchatid = search_term;
	organizationname = explOrg[1];
	chatWidget();
	setTimeout(function() { enableBlueleapChatWidgetEnterKey(); }, 2000);
	return false;
}

function enableBlueleapChatWidgetEnterKey()
{
	var frmBlueleapChatWidget = document.getElementById("frmBlueleapChatWidget");
    if(typeof(frmBlueleapChatWidget) != 'undefined' && frmBlueleapChatWidget != null){
		document.getElementById('frmBlueleapChatWidget').addEventListener('keypress', function (event) {
			if (event.keyCode == 13) {
				event.preventDefault();
				secondScreen();
			}
		});
		
		document.getElementById('txtBlueleapName').addEventListener('keyup', function (event) {
			if (event.target.value != '') {
				event.preventDefault();
				document.getElementById("txtBlueleapName").style.border="1px solid #a9d7ff";
				document.getElementById("spanBlueleapName").innerHTML = "";
			}
		});
		
		document.getElementById('txtBlueleapEmail').addEventListener('keyup', function (event) {
			if (event.target.value != '') {
				event.preventDefault();
				var resultEmail = validateEmail(event.target.value);
				if(resultEmail == true)
				{
					document.getElementById("txtBlueleapEmail").style.border="1px solid #a9d7ff";
					document.getElementById("spanBlueleapEmail").innerHTML = "";
				}
				if(resultEmail == false)
				{
					document.getElementById("txtBlueleapEmail").style.border="1px solid #e62727";
					document.getElementById("spanBlueleapEmail").innerHTML = "Invalid Email";
					return false;
				}
			}
		});
    }
}

function validateEmail(emailValue)
{
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(emailValue))
	{
    	return false;
	}
	else
	{
		return true;
	}
}




//------ENCRYPTION SHA 256-----------//
/**
* Secure Hash Algorithm (SHA256)
**/
function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value >>> amount) | (value << (32 - amount));
	};

	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty] * 8;

	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
			k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
		}
	}

	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j >> 8) return; // ASCII check: only accept characters in range 0-255
		words[i >> 2] |= j << ((3 - i) % 4) * 8;
	}
	words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
	words[words[lengthProperty]] = (asciiBitLength)

	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);

		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e & hash[5]) ^ ((~e) & hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
					w[i - 16]
					+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
					+ w[i - 7]
					+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
				) | 0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

			hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1) | 0;
		}

		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i]) | 0;
		}
	}

	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i] >> (j * 8)) & 255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};
