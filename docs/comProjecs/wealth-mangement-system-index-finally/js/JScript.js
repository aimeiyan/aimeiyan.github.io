//<!--
    function DbClickEvent(d)
	{
	    //window.alert("事件类型: DoubleClidk  作用对象: " + d);
	}

	function ClickEvent(d)
	{
	    window.alert("事件类型: OnClick  作用对象: " + d);
	}
	function GridViewItemKeyDownEvent(d)
	{
	    //window.alert("事件类型: GridViewItemKeyDownEvent  作用对象: " + d);
	}
	//按Alt + (1 to 5)运行
	function KeyDownEvent()
	{
	    if ( event.altKey && event.keyCode > 48 && event.keyCode < 54 )
	    {
	        window.showModalDialog('InputData.aspx','color','dialogWidth:205px;dialogHeight:160px;help:0;status:0');
	        //window.alert("事件类型: FormKeyDownEvent  选中记录数: " + ( parseInt(event.keyCode) - 48 ));
	    }
	}

    //------------------全局变量-------------------------
    //var preColor="#e8e9fc";//保存行原来的颜色
    var preColor="#White";
    var selectedItem;//选定的行

    //---------------------------------------------------
    //--------------funtion selectItem-------------------
    //选定一行546
    //---------------------------------------------------
    function selectItem(item,selected) {
        var aitem = item;
        //!!! if (aitem !=null && aitem.item == "1"){
        if (aitem !=null){
            while(aitem.tagName != "TR"){
                aitem = aitem.parentElement;
            }
            if(selected){
                aitem.bgColor = "#4baae6";           //"#FFCC66";
                aitem.style.color = "White";        //"#663399";
                selectedItem = aitem;               //当前选中的行
            }
            else{
//                aitem.bgColor="#e8e9fc";
//                aitem.style.color = "#000000";
                aitem.bgColor="White";
                aitem.style.color = "#330099";
                selectedItem = null;
            }
            preColor =aitem.bgColor;
        }
    }

    function document_onmouseover(o) {
        o.bgColor = "#e8f9fc";
        o.style.color = "#000000";
    }

    function document_onmouseout(o) {
        if(o!=selectedItem)
        {
            o.bgColor = "#e8e9fc";
            o.style.color = "#000000";
        }
        else
        {
            o.bgColor = "#0101aa";
            o.style.color = "#ffffff";
        }
    }

    function document_onclick(o) {
        selectItem(selectedItem,false);//清空上一次选中的状态
        selectedItem=o;
        selectItem(selectedItem,true);
        setSession();
    }
    function document_onclick2(o) {
        selectItem(selectedItem,false);//清空上一次选中的状态
        selectedItem=o;
        selectItem(selectedItem,true);
        //setSession();
    }
    function document_onclick3(o) {
        selectItem(selectedItem, false); //清空上一次选中的状态
        selectedItem = o;
        selectItem(selectedItem, true);
        setSession3();
    }

    function TR_ondblclick(){
        //alert(selectedItem.item);
        if(selectedItem.item == "1"){
            var ysbm=selectedItem.cells("ysbm").ysbm;
            var xm=selectedItem.cells("xm").innerText;
            var ksbm=selectedItem.cells("ysbm").ksbm;
            window.returnValue = new Array(ysbm,xm,ksbm);
            window.close();
        }
    }

    function btnCancel_onclick() {
        window.close();
    }

    function document_onkeydown() {
        if (selectedItem!=null){
            //alert(selectedItem.line);
            var line=parseInt(selectedItem.line);//从0计
            var upline=line-1;
            var downline=line+1;
            var lineNum=parseInt(document.all("lineNum").value)-1;//总行数减一
            if (line>0)
                upline=line-1
            else
                upline=line
            if (line<lineNum)
                downline=line+1;
            else
                downline=line
            if (event.keyCode==13){//回车返回值
                selectedItem.ondblclick();
                //alert("dd");
            }
            //alert(event.keyCode);
            if (event.keyCode==38){//向上方向箭
                selectItem(selectedItem,false);
                selectItem(document.all("row"+upline.toString()),true);
            }
            if (event.keyCode==40){//向下方向箭
                selectItem(selectedItem,false);
                selectItem(document.all("row"+downline.toString()),true);
            }
        }
    }

    function window_onload(){
        //alert(document.all("row0"))
        if (document.all("row0")=="[object]"){
            selectItem(document.all("row0"),true);
        }else{
            btnCancel.focus();
        }
    }

    function getSession() {   
        document.form1.txt.value = "1";
        return false;
    }

    function setSession() {
        var ln;
        var txt = KillSpace(selectedItem.innerText);
       var lns = txt.replace('	',' ').split(' ');
       if (lns.length >= 2) ln = lns[1].substring(0,6);
       //document.all('TextBox1').value = ln;
       //document.form1.Button1.click();
       document.cookie="CurrFund=" + "Li_row=" + ln;
    }

    function setSession3() {
        var ln;
        var txt = KillSpace(selectedItem.innerText);
        var lns = txt.replace('	', ' ').split(' ');
        if (lns.length >= 1) ln = lns[0].substring(0, 6);
        document.cookie = "CurrClsFund=" + ln;
        document.cookie = "CurrClsIndex=" + eval(selectedItem.rowIndex - 1);
    }

    //写cookies
    function setCookie(name, value) {
        //var Days = 30;
        //var exp = new Date();
        //exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        //document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        document.cookie = name + "=" + escape(value);
    }

    //读取cookies
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) return unescape(arr[2]);
        else return null;
    }

    //删除cookies
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }


/****
* 目前识别范围
* Microsoft Internet Explorer IE浏览器 
* 		-->	TheWorld 世界之窗
* 		--> TT浏览器
* 		--> 360浏览器
*      --> 猎豹浏览器
* Mathon 傲游浏览器
* Opera  Opera浏览器
* Firefox 火狐浏览器
* Chrome Chrome浏览器
* */

var browseInfo = {
    //isMobile 是否移动终端
    //browse 浏览器标识 
    //name 浏览器名称 
    //version 浏览器 版本
    //extend 浏览器扩展标识 
};

function CheckBrowser()
{
    browseInfo.isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
    if (navigator.appName.indexOf("Microsoft Internet Explorer") != -1 && document.all) {
        browseInfo.browse = "IE";
        browseInfo.name = "IE浏览器";
        browseInfo.extend = "";
        var usagnt = navigator.userAgent.toLowerCase();
        var ver = usagnt;
        ver = ver.substring(ver.indexOf("msie"), ver.length);
        ver = ver.substring(0, ver.indexOf(";"))
        browseInfo.version = ver.replace("msie ", "");
        //世界之窗 浏览器
        if (navigator.appVersion.toLowerCase().indexOf("theworld") > -1) {
            browseInfo.extend = "TheWord";
            browseInfo.name = "世界之窗浏览器";
        } else if (navigator.appVersion.toLowerCase().indexOf("tencenttraveler") > -1) {
            browseInfo.extend = "TT " + navigator.appVersion.substring(0, 3);
            browseInfo.name = "TT浏览器";
        } else if (navigator.appVersion.toLowerCase().indexOf("lbbrowser") > -1) {
            browseInfo.extend = "LB";
            browseInfo.name = "猎豹浏览器";
        } else if (usagnt.indexOf('se 2.x') != -1) {
            //alert("SogouExtension");
            browseInfo.extend = "Sogou";
            browseInfo.name = "Sogou浏览器";
        }
        else {
            var is360 = false, is360se = false; ;
            if (window.external.twGetRunPath) {
                if (window.external.twGetRunPath().toLowerCase().indexOf("360se") > -1) is360 = true;
            }
            else if (window.external.GetRunPath) {
                if (window.external.GetRunPath(window.external.GetSID(window)).indexOf('360se') > -1) is360 = true;
            }
            try {
                if (window.external + "" == "undefined") is360se = true;
            }
            catch (ex) { }
            if (is360) {
                browseInfo.extend = "360SE";
                browseInfo.name = "360浏览器";
            }
            if (is360se) {
                browseInfo.extend = "360SE";
                browseInfo.name = "未知Se浏览器";
            }
        }
    } else if (navigator.appName.indexOf("Netscape") != -1) {
        browseInfo.browse = "Netscape";
        browseInfo.version = navigator.appVersion;  //!!! navigator.appVersion.substring(0, 3);
        if (browseInfo.isMobile) {  //移动 客户端
            var vers = navigator.appVersion.substring(navigator.appVersion.indexOf("Mobile") + 7, navigator.appVersion.length);
            var arrs = vers.split(" ");
            vers = arrs[arrs.length - 1];
            browseInfo.browse = vers.split("/")[0];
            browseInfo.version = vers.split("/")[1];
            browseInfo.name = browseInfo.browse + "手机浏览器";
        }
        else {  //非移动 客户端
            if (window.external && window.external.max_version && navigator.userAgent.toLowerCase().indexOf("maxthon") >= 0) {
                browseInfo.browse = "Mathon";
                browseInfo.version = window.external.max_version;
                browseInfo.name = "遨游浏览器";
            } else if (navigator.userAgent.indexOf("Firefox") != -1) {
                browseInfo.browse = "Firefox";
                browseInfo.name = "火狐浏览器";
                browseInfo.version = navigator.userAgent.substr((navigator.userAgent + "").lastIndexOf('/') + 1);
            } else if (navigator.userAgent.indexOf("Chrome") != -1) {
                browseInfo.browse = "Chrome";
                browseInfo.name = "Chrome浏览器";
                var subVersion = navigator.appVersion.substring(navigator.appVersion.indexOf("Chrome") + 7);
                browseInfo.version = subVersion.substring(0, 4);  //subVersion.substring(0, subVersion.indexOf(' '));
            }
            else {
                browseInfo.name = "未知Ns浏览器";
                browseInfo.version = navigator.appVersion.substring(0, 3);
            }
        }
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        browseInfo.browse = "Opera";
        browseInfo.name = "Opera浏览器";
        browseInfo.version = navigator.appVersion.substring(0, 3);
    } else {
        browseInfo.browse = "Unknown";
        browseInfo.name = "未知" + (browseInfo.isMobile ? "手机" : "") + "浏览器";
        browseInfo.version = "1.0";
    }
    //if(browseInfo.browse != "IE" || browseInfo.extend != "")
    //{
    //	alert("目前系统对IE浏览器兼容性比较好，\n你的浏览器为"+browseInfo.name+",\n如果办理业务建议使用系统自带的IE浏览器。");
    //}
    //!!! alert(browseInfo.name + "[version=" + browseInfo.version + "]");
    if (browseInfo.browse != "Chrome") {
        if ((browseInfo.browse == "IE" && browseInfo.extend != "") || browseInfo.browse != "IE")
            alert("目前财务富管理专家系统尚不支持您的浏览器：" + browseInfo.name + "，\n请您使用系统自带的 IE 浏览器，或者 Google Chrome 浏览器！");
    }
}

function KillSpace(uuu)
{
    while((uuu.length>0) && (uuu.charAt(0)==' '))
	    uuu=uuu.substring(1,uuu.length)
    while((uuu.length>0) && (uuu.charAt(uuu.length-1)==' '))
	    uuu=uuu.substring(0,uuu.length-1)
    return uuu
}

function Submit1_onclick()
{
    var phone,mobile,name1,pass1;

    name1=KillSpace(document.form1.userName.value);
    pass1=KillSpace(document.form1.password.value);
    if((name1.length==0)||(name1==" ")||(name1=="  ")||(name1=="   ")||(name1=="    ")) 
    {
	    alert("用户名不能为空！");
	    document.form1.userName.focus();
    	return false;
    }
    if((pass1.length==0)||(pass1==" ")||(pass1=="  ")||(pass1=="   ")||(pass1=="    ")) 
    {
	    alert("密码不能为空！");
	    document.form1.password.focus();
    	return false;
    }
    _getValue();
}

function getInternetExplorerVersion()
{
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat( RegExp.$1 );
    }
    return rv;
}

function _getValue()
{
    var Uname=document.getElementById("userName").value;
    var Upwd=document.getElementById("password").value;
	var wid = window.screen.availWidth;
	var hei = window.screen.availHeight;
    var ver = getInternetExplorerVersion();
    if ( ver > -1 )
    {
        if (ver >= 9.0) { hei = hei - 40;
            //alert("ie9="+hei);
        }
        else if (ver >= 8.0) { hei = hei - 24;
            //alert("ie8="+hei);
        }
    }
    var scrpix = wid + "x" + hei;
    var navigt = browseInfo.browse + browseInfo.version;
    if (browseInfo.browse == "IE" && browseInfo.extend != "") navigt = browseInfo.extend;

    var v = Login1.UserLogin(Uname, Upwd, scrpix, navigt).value;
    if　(v=="1") {
        OpenWin();
        CloseWin();
    }
    else if (v=="2") {
        alert("无法打开登录所请求的数据库！");
    }else{
        alert("用户名或者密码错误！");
    }
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
}

function StartDataSync(code)
{
    AjaxPro.timeoutPeriod = 1000 * 60 * 120;     //毫秒为单位, 120分钟
    if (code=="1") {
        document.getElementById("divmsg").innerText = "正在进行财汇数据同步...";
        DataSync.SyncFinChinaData(getStringCallBack);
    }
    else if (code=="2") {
        document.getElementById("divmsg").innerText = "正在进行分析指标计算...";
        var date4=document.getElementById("TextBox4").value;
        DataSync.SyncAnalyse(date4,getStringCallBack);
    }
    else if (code=="3") {
        document.getElementById("divmsg").innerText = "正在进行基金评级计算...";
        var date5=document.getElementById("TextBox5").value;
        DataSync.SyncEvaluate(date5,getStringCallBack);
    }
    else if (code=="4") {
        document.getElementById("divmsg").innerText = "正在进行行业指数导入...";
        DataSync.ImportIndex(getStringCallBack);
    }
    else if (code=="5") {
        document.getElementById("divmsg").innerText = "正在进行基金仓位统计...";
        var date1=document.getElementById("TextBox1").value;
        DataSync.SyncPosition(date1,getStringCallBack);
    }
    else if (code=="41") {
        document.getElementById("divmsg").innerText = "正在进行指数成份基金导入...";
        ParmSetting.ImportFundCode(getStringCallBack);
    }
    else if (code == "42") {
    document.getElementById("divmsg").innerText = "正在生成基金搜索代码...";
        ParmSetting.CreateSearchCode(getStringCallBack);
    }
    else if (code == "6") {
        document.getElementById("divmsg").innerText = "正在进行基金指数计算...";
        DataSync.FundIndexCalc(getStringCallBack);
    }
    else if (code=="7") {
        document.getElementById("divmsg").innerText = "正在进行基金风格指数计算...";
        DataSync.FundStyleCalc(getStringCallBack);
        //document.getElementById("divmsg").innerText += "\n正在进行财汇数据同步...";
        //DataSync.SyncFinChinaData(getStringCallBack1);
    }
}

function StartUserSync(code)
{
    AjaxPro.timeoutPeriod = 1000 * 60 * 30;     //毫秒为单位, 30分钟
    if (code=="1") {
        document.getElementById("divmsg").innerText = "正在进行用户数据同步...";
        UserSync.SyncUserData(getStringCallBack);
    }
    else if (code=="2") {
        document.getElementById("divmsg").innerText = "正在进行组织机构同步...";
        UserSync.SyncOrganData(getStringCallBack);
    }
}

function ClrSyncFlag()
{
    var res = DataSync.ClearSyncFlag();
    var ss = document.getElementById("divmsg").innerText;
    document.getElementById("divmsg").innerText = ss + "\n" + res.value;
}

function ClrSyncFlag2()
{
    var res = UserSync.ClearSyncFlag();
    var ss = document.getElementById("divmsg").innerText;
    document.getElementById("divmsg").innerText = ss + "\n" + res.value;
}

function getStringCallBack(res)
{
    if (res != ""){
        var ss = document.getElementById("divmsg").innerText;
        document.getElementById("divmsg").innerText = ss + "\n" + res.value;
    }
}

//function getStringCallBack1(res)
//{
//    if (res != ""){
//        var ss = document.getElementById("divmsg").innerText;
//        document.getElementById("divmsg").innerText = ss + "\n" + res.value;
//        document.getElementById("divmsg").innerText += "\n正在进行分析指标计算...";
//        var date4=document.getElementById("TextBox4").value;
//        DataSync.SyncAnalyse(date4,getStringCallBack2);
//    }
//}

//function getStringCallBack2(res)
//{
//    if (res != ""){
//        var ss = document.getElementById("divmsg").innerText;
//        document.getElementById("divmsg").innerText = ss + "\n" + res.value;
//        document.getElementById("divmsg").innerText += "\n正在进行基金评级计算...";
//        var date5=document.getElementById("TextBox5").value;
//        DataSync.SyncEvaluate(date5,getStringCallBack3);
//    }
//}

//function getStringCallBack3(res)
//{
//    if (res != ""){
//        var ss = document.getElementById("divmsg").innerText;
//        document.getElementById("divmsg").innerText = ss + "\n" + res.value;
//        document.getElementById("divmsg").innerText += "\n正在进行行业指数导入...";
//        DataSync.ImportIndustryIndex(getStringCallBack4);
//    }
//}

//function getStringCallBack4(res)
//{
//    if (res != ""){
//        var ss = document.getElementById("divmsg").innerText;
//        document.getElementById("divmsg").innerText = ss + "\n" + res.value;
//        document.getElementById("divmsg").innerText += "\n正在进行基金仓位计算...";
//        var date1=document.getElementById("TextBox1").value;
//        var date2=document.getElementById("TextBox2").value;
//        var date3=document.getElementById("TextBox3").value;
//        DataSync.SyncPosition(date1,date2,date3,getStringCallBack5);
//    }
//}

//function getStringCallBack5(res)
//{
//    if (res != ""){
//        var ss = document.getElementById("divmsg").innerText;
//        document.getElementById("divmsg").innerText = ss + "\n" + res.value;
//        document.getElementById("divmsg").innerText += "\n正在进行基金指数计算...";
//        DataSync.FundIndexCalc(getStringCallBack6);
//    }
//}

//function getStringCallBack6(res)
//{
//    if (res != ""){
//        var ss = document.getElementById("divmsg").innerText;
//        document.getElementById("divmsg").innerText = ss + "\n" + res.value;
//        document.getElementById("divmsg").innerText += "\n同步全部数据结束";
//    }
//}

function OpenWin()
{	
	var wid = window.screen.availWidth;
	var hei = window.screen.availHeight;
	var tmp=window.open("about:blank", "_blank", "top=0, left=0, toolbar=no, location=no,directories=no, menubar=no, resizable=no, status=yes");
	tmp.resizeTo(wid,hei);
	tmp.focus();
	tmp.location="Default.aspx";
}

function CloseWin()
{
	var ua=navigator.userAgent
	var ie=navigator.appName=="Microsoft Internet Explorer"?true:false
	if(ie){
    	var IEversion=parseFloat(ua.substring(ua.indexOf("MSIE ")+5,ua.indexOf(";",ua.indexOf("MSIE "))))
		if(IEversion< 5.5){
			var str  = '<object id=noTipClose classid="clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11">'
    		str += '<param name="Command" value="Close"></object>';
			document.body.insertAdjacentHTML("beforeEnd", str);
			document.all.noTipClose.Click();
    	}
		else{
    		window.opener =null;
    		window.open('','_self');
			window.close();
    	}
	}else{
   		window.open('','_self','');
		window.close()
	}
}

function ClearFundSel()
{
    FundAnalyse.Button6Click();
}
function ClearFundSel2()
{
    TradeFundQuotation.Button6Click();
}
function ClearFundSel3()
{
    PrvFundAnalyse.Button6Click();
}

function ClearParmSel()
{
    FundAnalyse.Button7Click();
}
function ClearParmSel2()
{
    TradeFundQuotation.Button7Click();
}
function ClearParmSel3()
{
    PrvFundAnalyse.Button7Click();
}

function SetFundSelSession(sendstring)
{
    FundAnalyse.SetFundSelectSettion(sendstring);
    SetFundSession();
}

function SetFundSelSession2(sendstring)
{
    TradeFundQuotation.SetFundSelectSettion(sendstring);
    SetFundSession();
}

function SetFundSelSession3(sendstring)
{
    PrvFundAnalyse.SetFundSelectSettion(sendstring);
    SetFundSession();
}

function SetFundSelSession4(sendstring)
{
    FundPosition.SetFundSelectSettion(sendstring);
}

function SetGetDataFlg()
{
    FundAnalyse.SetGetDataFlag();
}

function SetGetDataFlg2()
{
    TradeFundQuotation.SetGetDataFlag();
}

function SetGetDataFlg3()
{
    PrvFundAnalyse.SetGetDataFlag();
}

function RadioClick(n1, n2)
{
    switch (n1)
    {
        case 0:
            document.getElementById("tt0").style.color="Black";
            break;
        case 1:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt1").style.color="Black";
            break;
        case 2:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt2").style.color="Black";
            break;
        case 3:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt3").style.color="Black";
            break;
        case 4:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt4").style.color="Black";
            break;
        case 5:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt5").style.color="Black";
            break;
        case 6:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt6").style.color="Black";
            break;
        case 7:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt7").style.color="Black";
            break;
        case 8:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt8").style.color="Black";
            break;
        case 9:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt9").style.color="Black";
            break;
        case 10:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt10").style.color="Black";
            break;
        case 11:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt11").style.color="Black";
            break;
        case 12:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt12").style.color="Black";
            break;
        case 13:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt13").style.color="Black";
            break;
        case 14:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt14").style.color="Black";
            break;
        case 15:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt15").style.color="Black";
            break;
        case 16:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt16").style.color="Black";
            break;
        case 17:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt17").style.color="Black";
            break;
        case 18:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt18").style.color="Black";
            break;
        case 19:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt19").style.color="Black";
            break;
        case 20:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt20").style.color="Black";
            break;
        case 21:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt21").style.color="Black";
            break;
        case 22:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt22").style.color="Black";
            break;
        case 23:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt23").style.color="Black";
            break;
        case 24:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt24").style.color="Black";
            break;
        case 25:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt25").style.color="Black";
            break;
        case 26:
            PreceptInput.SetRButtonList(n1, n2);
            document.getElementById("tt26").style.color="Black";
            break;
    }
}

function Show_menuTab01(menuTabid_num,menuTabnum,num)
{
	for (var i = 0; i < num; i++) {
		document.getElementById("menuTabcontent01_"+menuTabid_num+i).style.display="none";
		document.getElementById("menuTabmenu01_"+menuTabid_num+i).className="li2";
	}
	document.getElementById("menuTabmenu01_"+menuTabid_num+menuTabnum).className="li3";
	document.getElementById("menuTabcontent01_"+menuTabid_num+menuTabnum).style.display="block";
}

function Show_menuTab02(menuTabid_num, menuTabnum, num) {
    for (var i = 0; i < num; i++) {
        document.getElementById("menuTabcontent02_" + menuTabid_num + i).style.display = "none";
        document.getElementById("menuTabmenu02_" + menuTabid_num + i).className = "li4";
    }
    document.getElementById("menuTabmenu02_" + menuTabid_num + menuTabnum).className = "li5";
    document.getElementById("menuTabcontent02_" + menuTabid_num + menuTabnum).style.display = "block";
}
