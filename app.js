line = new Array(), line2 = new Array(), product = new Array(), lnum = 0, lnum2 = 0, pnum = 0, time = 0, sum = 0;
let isFirst = true;
link = 'https://api.thingspeak.com/channels/548669/feeds.json?results=2';
checkValue = setInterval(function(event){
    $('#demo').load(link, function(data){
        var obj = JSON.parse(data);
        if(obj['feeds'][1]['field1'] == 1)
        {
            console.log('asd');
            time += 15;
            line[lnum] = '<li>' + time +'초 열렸습니다.</li>';
            $('#section-list .wrap #time ul').append(line[lnum]);
            lnum++;
        }
        else
        {
            time = 0;
            line[lnum] = '<li>닫혔습니다.</li>'
            $('#section-list .wrap #time ul').append(line[lnum]);
            lnum++;
            console.log(lnum);
        }
    
        if(obj['feeds'][1]['field2'] > 0 && checkProduct(obj['feeds'][1]['field2']))
        {
            product[pnum] = obj['feeds'][1]['field2']
            $('#section-list .wrap #rfid ul').append('<li>' + obj['feeds'][1]['field2'] + '번 상품이 냉장고 안에 있습니다.</li>');
            lnum2++;
        }
        else if(obj['feeds'][1]['field2'] > 0 && !checkProduct(obj['feeds'][1]['field2']))
        {
            product.splice(product.indexOf(obj['feeds'][1]['field2']), 1);
            $('#section-list .wrap #rfid ul').append('<li>' + obj['feeds'][1]['field2'] + '번 상품을 누군가가 가져갔습니다.</li>');
            lnum2++;
        }
        if(product.length == 0)
        {
            $('#section-list .wrap #rfid ul').append('<li>아무 상품도 들어있지 않습니다.</li>');
            lnum2++;
        }
        
        if(lnum == 6)
        {
            $('#section-list .wrap #time ul li')[0].remove();            
            lnum = 5;
        }
        if(lnum2 == 6)
        {
            $('#section-list .wrap #rfid ul li')[0].remove();
            lnum2 = 5;   
        }

        if (time != 0 ) sum += 15;
        console.log(sum + " / " + time);
        if (isFirst) {
            isFirst = false;
            $('#section-list .wrap #elec ul').append('<li>전력사용량 : ' + sum.toFixed(2) + '</li>');
            $('#section-list .wrap #CO2 ul').append('<li>이산화탄소 배출량 : ' + (sum * 4.24).toFixed(2) + '</li>');
            $('#section-list .wrap #Bill ul').append('<li>전기 사용 요금 : ' + (sum * 0.004).toFixed(2) + '원</li>');            
        } else {
            $('#section-list .wrap #elec ul li')[1].innerHTML = '전력사용량 : ' + sum.toFixed(2);           
            $('#section-list .wrap #CO2 ul li')[1].innerHTML = '이산화탄소 배출량 : ' + (sum * 4.24).toFixed(2);           
            $('#section-list .wrap #Bill ul li')[1].innerHTML = '전기 사용 요금 : ' + (sum * 0.004).toFixed(2) + '원';           
        }

    });
}, 15000);

$('#section-graph .wrap #temp .graph').append('<iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/548669/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=%EC%98%A8%EB%8F%84&type=line"></iframe>');
$('#section-graph .wrap #mois .graph').append('<iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/548669/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=%EC%8A%B5%EB%8F%84&type=line"></iframe>');

function checkProduct(value)
{
    for(i = 0; i < product.length; i++)
    {
        if(value == product[i]) 
            return false;
    }
    return true;
}

$('#section-why').on("click", function(event){
    $('#section-why .wrap .origin').hide();
    $('#section-why .wrap .blank').show();
    $('#section-why').on("click", function(event){
        window.open('file:///C:/Users/%EB%A5%98%EC%A0%95%EC%97%B0/Desktop/%EB%83%89%EC%9E%A5%EA%B3%A0%EB%A5%BC%20%EB%B6%80%ED%83%81%ED%95%B4!/web/src/news1.png', '_blank');
    })
});

$('#section-what').on("click", function(event){
    window.location = 'code.html';
});