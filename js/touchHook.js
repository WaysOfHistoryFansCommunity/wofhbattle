(function() {
    __initTouch = function(){
		if( !window.GLFW || !window.Browser || !Browser.calculateMouseEvent )
			return;
		
		{
			function disableFunctionKeys(e) {
				var functionKeys = new Array(112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123);
				if (functionKeys.indexOf(e.keyCode) > -1 || functionKeys.indexOf(e.which) > -1) {
					GLFW.onKeydown(e);
					e.preventDefault();
				}
			};
			
			window.document.onkeydown = disableFunctionKeys;
		}

		window.__allowedMouseMovementAxis = {x: true, y: true};
		
        Browser.calculateMouseEventOrigin = Browser.calculateMouseEvent;
		
        Browser.calculateMouseEvent = function(event){
            Browser.calculateMouseEventOrigin.apply(this, arguments);
			
            if( event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove' ){
                var setMouseCoor = function(touch, lastTouch){
                    if( !event.__mouseMovement || __allowedMouseMovementAxis.x ){
						Browser.mouseX = ~~touch.x;
						Browser.mouseMovementX = Browser.mouseX - (~~lastTouch.x);
					}
					else
						Browser.mouseMovementX = 0;
					
					if( !event.__mouseMovement || __allowedMouseMovementAxis.y ){
						Browser.mouseY = ~~touch.y;
						Browser.mouseMovementY = Browser.mouseY - (~~lastTouch.y);
					}
					else
						Browser.mouseMovementY = 0;
                };
				
                var touch = event.touch;
				
                if( touch === undefined )
                    setMouseCoor(Browser.touches[0], Browser.lastTouches[0]);
                else
                    setMouseCoor(Browser.touches[touch.identifier], Browser.lastTouches[touch.identifier]);
            }
        };
		
		Browser.getMouseWheelDeltaOrigin = Browser.getMouseWheelDelta;
		
		Browser.getMouseWheelDelta = function(event){
			if( event.__delta ){
				event.deltaY = event.wheelDeltaY = event.__delta;
				
				return event.__delta;
			}
			
			return Browser.getMouseWheelDeltaOrigin.apply(this, arguments);
		};
		
		
        GLFW.__onTouchStart = function(e){
			if( e.touches.length > 1 ){
				GLFW.__onTouchZoomStart(e);
				
				return;
			}
			
            e.touch = e.touches[0];
            e.button = 0;

            GLFW.onMouseButtonDown(e);
			
			e.__mouseMovement = true;
			
            GLFW.onMousemove(e);
        };
        GLFW.__onTouchMove = function(e){
			if( e.touches.length > 1 ){
				GLFW.__onTouchZoomMove(e);
				
				return;
			}
			
            e.touch = e.touches[0];
			
			e.__mouseMovement = true;
			
            GLFW.onMousemove(e);
        };
        GLFW.__onTouchEnd = function(e){
			var touches = e.touches;
			
			if( touches.length > 1 )
				return;
			else if( touches.length == 1 ){
				GLFW.__onTouchZoomEnd(e);
				
				GLFW.__onTouchStart(e);

				return;
			}
			
			GLFW.__onTouchZoomEnd(e);
			
            e.touch = e.touches[0];	
            e.button = 0;
			
            GLFW.onMouseButtonUp(e);
        };
		
		GLFW.__onTouchZoomStart = function(e){
            GLFW.__onTouchEnd(e);
			
			var touches = e.touches;
			
			e.preventDefault();
			
			GLFW.__touchZooming = {counter: 0};
		
			GLFW.__touchZooming.pointA = {x: touches[0].pageX, y: touches[0].pageY};
			GLFW.__touchZooming.pointB = {x: touches[1].pageX, y: touches[1].pageY};

			// Вектор от a к b
			var vacAB = {
				x: GLFW.__touchZooming.pointA.x - GLFW.__touchZooming.pointB.x,
				y: GLFW.__touchZooming.pointA.y - GLFW.__touchZooming.pointB.y
			};
			
			GLFW.__touchZooming.lengthAB = Math.sqrt(vacAB.x*vacAB.x + vacAB.y*vacAB.y);
        };
		GLFW.__onTouchZoomMove = function(e){
            var touches = e.touches;
			
			e.preventDefault();
			
			GLFW.__touchZooming.pointA.x = touches[0].pageX; 
			GLFW.__touchZooming.pointA.y = touches[0].pageY;
			
			GLFW.__touchZooming.pointB.x = touches[1].pageX; 
			GLFW.__touchZooming.pointB.y = touches[1].pageY;
			
			var vacAB = {
				x: GLFW.__touchZooming.pointA.x - GLFW.__touchZooming.pointB.x,
				y: GLFW.__touchZooming.pointA.y - GLFW.__touchZooming.pointB.y
			};
			
			var lengthAB = Math.sqrt(vacAB.x*vacAB.x + vacAB.y*vacAB.y),
				zoomK = (lengthAB/GLFW.__touchZooming.lengthAB);
			
			e.__delta = zoomK > 1 ? -1 : 1;
			
			if( !((++GLFW.__touchZooming.counter)%10) )
				GLFW.onMouseWheel(e);
			
			this.__touchZooming.lengthAB = lengthAB;
        };
		GLFW.__onTouchZoomEnd = function(e){
            delete GLFW.__touchZooming;
        };
		
		
        Module['canvas'].addEventListener('touchstart', GLFW.__onTouchStart, true);
        Module['canvas'].addEventListener('touchmove', GLFW.__onTouchMove, true);
        Module['canvas'].addEventListener('touchend', GLFW.__onTouchEnd, true);
		
		GLFW.__touchInited = true;
    };
	
	setTimeout(__initTouch, 1000);
})();
