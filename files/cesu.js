		function test() {
		    var span,
		        d = document,
		        li,
		        a,
		        i,
		        lis = d.getElementById('cesu').getElementsByTagName('li');
		    for (i = 0; li = lis[i++];) {
		        a = li.getElementsByTagName('a')[0];
		        if (!a) {
		            continue;
		        }
		        span = d.createElement('span');
		        span.ctime = new Date();
		        span.style.display = 'none';
		        span.innerHTML = '测速中...<img src="' + a.href + '" border="0" width="1" height="1" onerror="testresult(this)" />';
		        li.appendChild(span);
		    }
		};

		function testresult(img) {
		    var span = img.parentNode;
		    var n = 'em';
		    if (!testresult.isrun) {
		        n = 'span';
		        testresult.isrun = true;
		    }
		    $(span).parents('li').find('.miaoinpt1').html((new Date() - span.ctime) + 'ms')
		    span.innerHTML = '<' + n + '>' + ((new Date() - span.ctime) / 1000) + '秒</' + n + '>';
		};
		var ran = Math.random();
		test();