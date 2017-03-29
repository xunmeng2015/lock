var cir_radiu = 25;	//半径
var cxt_height = 400;	//画布高度
var offset_x = 30;	//X方向偏移
var offset_y = 60;	//Y方向偏移
var body_width = document.body.clientWidth;//获取窗口宽度
var space_x = (body_width - offset_x * 2 - cir_radiu * 2 * 3) / 2;		//三个圆之间的X方向间隙
var space_y = (cxt_height - offset_y * 2 - cir_radiu * 2 * 3) / 2;		//三个圆之间的Y方向间隙
var point_arr = [];			//保存圆心
var pass = [];	//记录密码
var start_x = 0;		//直线起始点x坐标
var start_y = 0;
var pass_point = [];		//记录经过的圆
$(function(){
	var canvas = document.getElementById("canvas");
	var cxt = canvas.getContext("2d");
	canvas.width = body_width;
	canvas.height = cxt_height;
	paintCircle(cxt);
	$(".canvas").on("touchstart", function(e){
		check(cxt, e.touches[0], pass);
	});
	$(".canvas").on("touchmove", function(e){
		e.preventDefault();
		cxt.clearRect(0,0,body_width,cxt_height);
		paintCircle(cxt);
		check(cxt, e.touches[0], pass);
	});
	$(".canvas").on("touchend", function(e){
		cxt.clearRect(0, 0, body_width, cxt_height)
		paintCircle(cxt);
		$.each(point_arr, function(index){
			$(this)[0].full = 0;
		});
		start_x = 0;
		start_y = 0;
//		console.log(pass);
//		alert(pass);
		pass = [];
		pass_point = [];
	});
});

function check(cxt, touches, pass){
	if(pass.length > 0){
		start_x = pass_point[0].x;
		start_y = pass_point[0].y;
		$.each(pass_point, function(index){
			cxt.beginPath();
			cxt.lineWidth = 4;
			cxt.arc(point_arr[pass[index]].x, point_arr[pass[index]].y, cir_radiu, 0, Math.PI*2,false);
			cxt.strokeStyle="#ff9900";
			cxt.fillStyle = "#ffcc00";
			cxt.fill();
			cxt.moveTo(start_x,start_y);
			cxt.lineTo(point_arr[pass[index]].x, point_arr[pass[index]].y);
			start_x = point_arr[pass[index]].x;
			start_y = point_arr[pass[index]].y;
			cxt.stroke();
			cxt.closePath();
		});
	}
		var x = touches.pageX;
		var y = touches.pageY;
		if(is_inCircle(cxt, x, y)){
			if(pass.length == 0){
				return false;
			}
			cxt.beginPath();
			cxt.moveTo(pass_point[pass_point.length - 1].x, pass_point[pass_point.length - 1].y);
			cxt.lineTo(x, y);
			cxt.stroke();
			cxt.closePath();
		}
		cxt.closePath();
}

function is_inCircle(cxt, x, y){			//判断点是否位于圆内
	cxt.beginPath();
	var a = true;
	$.each(point_arr, function(index){		//判断是否经圆
		if(Math.pow(x - $(this)[0].x, 2) + Math.pow(y - $(this)[0].y, 2) < cir_radiu * cir_radiu){
			if($(this)[0].full == 1){			//判断是否已经经过这个点
				return false;
			}
			paintFullCircle($(this)[0].x, $(this)[0].y, cxt);
			if(start_x == 0){			//第一个点
				pass.push(index);
				pass_point.push({
					x:$(this)[0].x,
					y:$(this)[0].y
				});
				$(this)[0].full = 1;
				return false;
			}
			else{						//不是第一个点
				pass.push(index);
				pass_point.push({
					x:$(this)[0].x,
					y:$(this)[0].y
				});
				cxt.moveTo(start_x,start_y);
				cxt.lineTo($(this)[0].x,$(this)[0].y);
				cxt.stroke();
				start_x = $(this)[0].x;		//该点成为起点
				start_y = $(this)[0].y;
				$(this)[0].full = 1;
				return false;
			}
			a = false;
		}
	});
	cxt.closePath();
	return a;
}

function paintCircle(cxt){				//画圆
	for(var x = 0; x < 3; x++){
		for(var y = 0; y < 3; y++){
			cxt.beginPath();
			cxt.lineWidth = 4;
			cxt.arc(offset_x + space_x * x + cir_radiu * (2 * x + 1), offset_y + space_y * y + cir_radiu * (2 * y + 1), cir_radiu, 0, Math.PI*2,false);
			cxt.strokeStyle="#ff9900";
			cxt.fillStyle = "white";
			cxt.fill();
			cxt.stroke();
			cxt.closePath();
			point_arr.push({			//将圆心保存起来，方便后面判断是否经过圆心
				x:offset_x + space_x * x + cir_radiu * (2 * x + 1),
				y:offset_y + space_y * y + cir_radiu * (2 * y + 1),
				full:0
			})
		}
	}
}

function paintFullCircle(x, y, cxt){		//填充圆
	cxt.lineWidth = 4;
	cxt.arc(x, y, cir_radiu, 0, Math.PI*2,false);
	cxt.strokeStyle="#ff9900";
	cxt.fillStyle = "#ffcc00";
	cxt.fill();
	cxt.stroke();
}

