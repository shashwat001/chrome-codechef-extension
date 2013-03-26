function fetchPage(url) {

        $.ajax({
        type: "GET",
        url: url,
        error: function(request, status) {
            alert('Error fetching ' + url);
        },
        success: function(data) {

            var textstring = "<table>";
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
                textstring += "<tr><td><b>"+$headers.eq(i).html()+"</b></td></tr><tr>";
                for(j = 1;j < Math.min(10,trsize);j++)
                {
                    var td = $('td',tr[j]);
                    var tdsize = td.size();
                    //alert(tdsize);
                    for(k = 0;k < tdsize;k++)
                    {
                        textstring += "<td>"+td.eq(k).html()+"</td>";
                    }
                    textstring += "</tr>";
                }

            }
            textstring += "</table>";

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
