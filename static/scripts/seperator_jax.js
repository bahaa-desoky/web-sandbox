// core MathJax implementation courtesy of https://github.com/mathjax/MathJax/issues/2079.
// core seperator js and html courtesy of https://stackoverflow.com/questions/12194469/best-way-to-do-a-split-pane-in-html.

window.onload = function() {
    dragElement( document.getElementById("separator"), "H" );

    // mathjax stuff
    var doc = document.querySelector("iframe").contentWindow.document;
    var config = doc.createElement("script");
    config.type = "text/x-mathjax-config";
    config.text = 
        [
            "MathJax.Hub.Config({",
            "  tex2jax: {",
            "    inlineMath: [['$','$'], ['\\\\(','\\\\)']]",
            "  }",
            "});",
            "function Typeset() {MathJax.Hub.Queue(['Typeset', MathJax.Hub])}"
        ].join("\n");
        doc.head.append(config);
        var script = doc.createElement("script");
        script.type = "text/javascript" 
        script.src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-AMS-MML_HTMLorMML"; 
        doc.head.append(script);

    }

    // This function is used for dragging and moving
    function dragElement( element, direction, handler )
    {
    // Two variables for tracking positions of the cursor
    const drag = { x : 0, y : 0 };
    const delta = { x : 0, y : 0 };
    /* If present, the handler is where you move the DIV from
        otherwise, move the DIV from anywhere inside the DIV */
    handler ? ( handler.onmousedown = dragMouseDown ): ( element.onmousedown = dragMouseDown );

    // A function that will be called whenever the down event of the mouse is raised
    function dragMouseDown( e )
    {
        drag.x = e.clientX;
        drag.y = e.clientY;
        document.onmousemove = onMouseMove;
        document.onmouseup = () => { 
            document.onmousemove = document.onmouseup = null;
            // allows for copy+paste, other commands in iframe after mouse raised from seperator  
            document.querySelector("iframe").style.pointerEvents = "auto";}
        
        // disables pointer events on iframe when dragging seperator for fluid movement
        document.querySelector("iframe").style.pointerEvents = "none";
    }

    // A function that will be called whenever the up event of the mouse is raised
    function onMouseMove( e )
    {
        const currentX = e.clientX;
        const currentY = e.clientY;

        delta.x = currentX - drag.x;
        delta.y = currentY - drag.y;

        const offsetLeft = element.offsetLeft;
        const offsetTop = element.offsetTop;


        const first = document.getElementById("first");
        const second = document.getElementById("second");
        let firstWidth = first.offsetWidth;
        let secondWidth = second.offsetWidth;
        if (direction === "H" ) // Horizontal
        {
            element.style.left = offsetLeft + delta.x + "px";
            firstWidth += delta.x;
            secondWidth -= delta.x;
        }
        drag.x = currentX;
        drag.y = currentY;
        first.style.width = firstWidth + "px";
        second.style.width = secondWidth + "px";

    }
}