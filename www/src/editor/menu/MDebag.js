

export class MDebag  {
  	constructor(par,fun) {  		
  		this.type="MDebag";
  		var self=this;
        this.par=par
        this.fun=fun
        this.param=this.par.param;

        this.otstup=this.param.otstup;
        this.otstup1=this.param.otstup;
        this.wh=this.param.wh;
        this.width=this.param.sizeBase;
      

        this.dCont=new DCont(par.dCont);
   
        
        this.array=[];


        this.dragPic=this.par.dragPic//new DragPic(par.dCont)

        this.init=function(){

            this.window=new DWindow(this.dCont,700,2,"menu");
            this.window.width=250;

            var link="1651346555317";
            //var link="lineMin1";
            var link="line";

            var label=new DLabel(null, 0,0,"start '"+link+".xml'")
            this.window.addD(label);
       

            this.button=new DButton(this.dCont, 300,5,"load File xml",function(e){
                  
               var a=e.split("base64,");
               var str=window.atob(a[1]);

               var ooo=xz(str);
                

                
               
               var o1=xml2json(ooo,"");
                  
               var ow=JSON.parse(o1);
               self.par.par.gps.setJson(ow); 
                 
                
            })
            this.button.startFile("xml");
            this.window.addD(this.button);


            this.button1=new DButton(this.dCont, 300,5,"save file",function(e){                
                var o=self.par.par.gps.activeObject;
                var o1=o.object               
                var p1 = json2xml(o1,"");
                saveFile(p1) 
            })
            
            this.window.addD(this.button1);

            function saveFile(str){
               let blob = new Blob([str], {type: "text/xml"});
               let link = document.createElement("a");
               link.setAttribute("href", URL.createObjectURL(blob));
               link.setAttribute("download", Date.now()+"");
               link.click();
            }

            function xz(xmlStr) {
                return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
            }
           
/*
            $.ajax({
                //url: "resources/csvConfigOld.csv"+this.plus,
                url: "resources/hlam/"+link+".xml",
                success: function function_name(data) {
                    trace(data) 
                    var o1=xml2json(data,"");                    
                    var o=JSON.parse(o1);                    
                    trace(o)
                
                    self.par.par.gps.setJson(o);                   
                    


                    //                                                      
                },
                error:function function_name(data) {
                    console.log("Что то случилось с конфигом")
                     
                }
            });*/
            
        }


        function json2xml(o, tab) {
           var toXml = function(v, name, ind) {
              var xml = "";
              if (v instanceof Array) {
                 for (var i=0, n=v.length; i<n; i++)
                    xml += ind + toXml(v[i], name, ind+"\t") + "\n";
              }
              else if (typeof(v) == "object") {
                 var hasChild = false;
                 xml += ind + "<" + name;
                 for (var m in v) {
                    if (m.charAt(0) == "@")
                       xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                    else
                       hasChild = true;
                 }
                 xml += hasChild ? ">" : "/>";
                 if (hasChild) {
                    for (var m in v) {
                       if (m == "#text")
                          xml += v[m];
                       else if (m == "#cdata")
                          xml += "<![CDATA[" + v[m] + "]]>";
                       else if (m.charAt(0) != "@")
                          xml += toXml(v[m], m, ind+"\t");
                    }
                    xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
                 }
              }
              else {
                 xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
              }
              return xml;
           }, xml="";
           for (var m in o)
              xml += toXml(o[m], m, "");
           return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
        }




        function xml2json(xml, tab) {
           var X = {
              toObj: function(xml) {
                 var o = {};
                 if (xml.nodeType==1) {   // element node ..
                    if (xml.attributes.length)   // element with attributes  ..
                       for (var i=0; i<xml.attributes.length; i++)
                           o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
                         // o[xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
                    if (xml.firstChild) { // element has child nodes ..
                       var textChild=0, cdataChild=0, hasElementChild=false;
                       for (var n=xml.firstChild; n; n=n.nextSibling) {
                          if (n.nodeType==1) hasElementChild = true;
                          else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                          else if (n.nodeType==4) cdataChild++; // cdata section node
                       }
                       if (hasElementChild) {
                          if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                             X.removeWhite(xml);
                             for (var n=xml.firstChild; n; n=n.nextSibling) {
                                if (n.nodeType == 3)  // text node
                                   o["#text"] = X.escape(n.nodeValue);
                                else if (n.nodeType == 4)  // cdata node
                                   o["#cdata"] = X.escape(n.nodeValue);
                                else if (o[n.nodeName]) {  // multiple occurence of element ..
                                   if (o[n.nodeName] instanceof Array)
                                      o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                   else
                                      o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                }
                                else  // first occurence of element..
                                   o[n.nodeName] = X.toObj(n);
                             }
                          }
                          else { // mixed content
                             if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                             else
                                o["#text"] = X.escape(X.innerXml(xml));
                          }
                       }
                       else if (textChild) { // pure text
                          if (!xml.attributes.length)
                             o = X.escape(X.innerXml(xml));
                          else
                             o["#text"] = X.escape(X.innerXml(xml));
                       }
                       else if (cdataChild) { // cdata
                          if (cdataChild > 1)
                             o = X.escape(X.innerXml(xml));
                          else
                             for (var n=xml.firstChild; n; n=n.nextSibling)
                                o["#cdata"] = X.escape(n.nodeValue);
                       }
                    }
                    if (!xml.attributes.length && !xml.firstChild) o = null;
                 }
                 else if (xml.nodeType==9) { // document.node
                    o = X.toObj(xml.documentElement);
                 }
                 else
                    alert("unhandled node type: " + xml.nodeType);
                 return o;
              },
              toJson: function(o, name, ind) {
                 var json = name ? ("\""+name+"\"") : "";
                 if (o instanceof Array) {
                    for (var i=0,n=o.length; i<n; i++)
                       o[i] = X.toJson(o[i], "", ind+"\t");
                    json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
                 }
                 else if (o == null)
                    json += (name&&":") + "null";
                 else if (typeof(o) == "object") {
                    var arr = [];
                    for (var m in o)
                       arr[arr.length] = X.toJson(o[m], m, ind+"\t");
                    json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
                 }
                 else if (typeof(o) == "string")
                    json += (name&&":") + "\"" + o.toString() + "\"";
                 else
                    json += (name&&":") + o.toString();
                 return json;
              },
              innerXml: function(node) {
                 var s = ""
                 if ("innerHTML" in node)
                    s = node.innerHTML;
                 else {
                    var asXml = function(n) {
                       var s = "";
                       if (n.nodeType == 1) {
                          s += "<" + n.nodeName;
                          for (var i=0; i<n.attributes.length;i++)
                             s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                          if (n.firstChild) {
                             s += ">";
                             for (var c=n.firstChild; c; c=c.nextSibling)
                                s += asXml(c);
                             s += "</"+n.nodeName+">";
                          }
                          else
                             s += "/>";
                       }
                       else if (n.nodeType == 3)
                          s += n.nodeValue;
                       else if (n.nodeType == 4)
                          s += "<![CDATA[" + n.nodeValue + "]]>";
                       return s;
                    };
                    for (var c=node.firstChild; c; c=c.nextSibling)
                       s += asXml(c);
                 }
                 return s;
              },
              escape: function(txt) {
                 return txt.replace(/[\\]/g, "\\\\")
                           .replace(/[\"]/g, '\\"')
                           .replace(/[\n]/g, '\\n')
                           .replace(/[\r]/g, '\\r');
              },
              removeWhite: function(e) {
                 e.normalize();
                 for (var n = e.firstChild; n; ) {
                    if (n.nodeType == 3) {  // text node
                       if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                          var nxt = n.nextSibling;
                          e.removeChild(n);
                          n = nxt;
                       }
                       else
                          n = n.nextSibling;
                    }
                    else if (n.nodeType == 1) {  // element node
                       X.removeWhite(n);
                       n = n.nextSibling;
                    }
                    else                      // any other node
                       n = n.nextSibling;
                 }
                 return e;
              }
           };
           if (xml.nodeType == 9) // document node
              xml = xml.documentElement;
           var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
           return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
        }




        
        this.init()
     
        this.sizeWindow = function(w,h,s){             
              
        }
  	}

     

}




