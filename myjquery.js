function fetchPage(url) {

        $.ajax({
        type: "GET",
        url: url,
        error: function(request, status) {
            alert('Error fetching ' + url);
        },
        success: function(data) 
        {
            var montharr = new Array("Jan","Feb","Mar","April","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
            var colorarr = new Array("#33CC99","#33FF99");
            var textstring = "";
            //document.write(data);
            var $divelem = $("div.table-questions",$(data));
            var $headers = $("h3",$(data));

            var contsite = $divelem.size();
            for(i = 0;i < contsite;i++)
            {
                var ob = $divelem.eq(i);
                var tr = $('tr',ob);
                var trsize = tr.size();
                //alert(trsize);

                
                textstring += "<table class=\"tableclass\">";
                textstring += "<caption class=\"heading\">"+$headers.eq(i).html()+"</caption>";
                textstring += "<tr><th>CODE</th><th>LINK</th><th>START</th><th>END</th></tr>";
                for(j = 1;j < Math.min(10,trsize);j++)
                {
                    textstring += "<tr style=\"background-color:"+colorarr[j%2]+"\">";
                    var td = $('td',tr[j]);
                    var tdsize = td.size();
                    //alert(tdsize);
                    for(k = 0;k < tdsize;k++)
                    {
                        if(k==2 || k==3)
                        {
                            var timeval = td.eq(k).html();
                            timeval = timeval.split(" ");
                            var dayval = parseInt(timeval[0][8]*10)+parseInt(timeval[0][9]);
                            var month = parseInt(timeval[0][5]*10)+parseInt(timeval[0][6]);
                            var yearval = timeval[0].substring(0,4);
                            textstring += "<td style=\"width:100px;\">"+montharr[month-1]+" "+ dayval +", "+yearval+"<br>"+timeval[1]+"</td>";
                        }
                        else if(k==1)
                        {
                            textstring += "<td><a href=\"http://www.codechef.com/"+td.eq(k-1).text()+"\" target=new >"+td.eq(k).text()+"</a></td>";
                        }
                        else
                        {
                            textstring += "<td>"+td.eq(k).text()+"</td>";
                        }
                    }
                    textstring += "</tr>";
                }
                textstring += "</table><br>";



            }
            //textstring += "</table>";

            var element = document.createElement("div");
            element.setAttribute("id", "mainbox");
            //var element = document.getElementsByName("mainbox");
            //var newContent = document.createHtmlNode(textstring);
            element.innerHTML = textstring; 
            $('#mainbox').css('backgroundColor','#EE178C')
            document.body.appendChild(element);
            //document.write(textstring);
        }

    });
}

document.addEventListener('DOMContentLoaded', function() 
{
    fetchPage("http://www.codechef.com/contests");
});
