var cir_radiu = 35;	//半径
var cxt_height = 800;	//画布高度
var offset_x = 150;	//X方向偏移
var offset_y = 140;	//Y方向偏移
var body_width = document.body.clientWidth;//获取窗口宽度
var space_x = (body_width - offset_x * 2 - cir_radiu * 2 * 3) / 2;		//三个圆之间的X方向间隙
var space_y = (cxt_height - offset_y * 2 - cir_radiu * 2 * 3) / 2;		//三个圆之间的Y方向间隙
var point_arr = [];			//保存圆心
$(function(){
	var canvas = document.getElementById("canvas");
	var cxt = canvas.getContext("2d");
	canvas.width = body_width;
	canvas.height = cxt_height;
	paintCircle(cxt);
//	window.onresize = function(){
//		paintCircle();
//	}
	$(".canvas").click(function(e){
		var x = e.clientX;
		var y = e.clientY;
		$.each(point_arr, function(index){
			if(Math.pow(x - $(this)[0].x, 2) + Math.pow(y - $(this)[0].y, 2) < cir_radiu * cir_radiu){
//				console.log($(this)[0].x + " " + $(this)[0].y);
				paintCircle(cxt);
				paintFullCircle($(this)[0].x, $(this)[0].y, cxt);
				return false;
			}
		});
//		console.log("end");
	});
});


function paintCircle(cxt){
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
				y:offset_y + space_y * y + cir_radiu * (2 * y + 1)
			})
		}
	}
}

function paintFullCircle(x, y, cxt){
	cxt.beginPath();
	cxt.lineWidth = 4;
//	cxt.arc(offset_x + space_x * x + cir_radiu * (2 * x + 1), offset_y + space_y * y + cir_radiu * (2 * y + 1), cir_radiu, 0, Math.PI*2,false);
	cxt.arc(x, y, cir_radiu, 0, Math.PI*2,false);
	cxt.strokeStyle="#ff9900";
	cxt.fillStyle = "#ffcc00";
	cxt.fill();
	cxt.stroke();
	cxt.closePath();
}

function quitFull(x, y, cxt){
	cxt.beginPath();
	cxt.lineWidth = 4;
//	cxt.arc(offset_x + space_x * x + cir_radiu * (2 * x + 1), offset_y + space_y * y + cir_radiu * (2 * y + 1), cir_radiu, 0, Math.PI*2,false);
	cxt.arc(x, y, cir_radiu, 0, Math.PI*2,false);
	cxt.strokeStyle="#ff9900";
	cxt.stroke();
	cxt.closePath();
}
