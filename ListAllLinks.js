(function (window, document)
{  
  var rImage = /\.(jpg|gif|jpeg|ico|png)$/;
  
  var linkBox = document.getElementById('display');
  
  if (linkBox)    
  {
    if (linkBox.style.display == 'none')
    {
      linkBox.style.display = 'block';
    }
    
    return;
  }
  
  var aElements = document.getElementsByTagName('a');
  var links = [];
  
  for (var i = 0; i < aElements.length; i++)
  {
    if (aElements[i].href == '' || aElements[i]
                                   .href
                                   .toLowerCase()
                                   .replace(/^\s+/, '')
                                   .replace(/\s+$/, '')
                                   .replace(/;+$/, '') == 'javascript:')
    {
      continue;
    }
    
    var currentHostName = document.location.hostname;      
    
    var types = [];
    
    var spiltedLink = aElements[i].href.slice(7).split('/');
    var firstPartial = spiltedLink[0].toLowerCase();                    
    
    if (currentHostName != spiltedLink[0].toLowerCase().substr(-currentHostName.length))
    {
      types.push('x');
    }

    if (rImage.test(aElements[i].href.toLowerCase()))
    {
      types.push('i');
    }    
    
    links.push('<li><span>[' + (i + 1) + ']:' + aElements[i].innerHTML + ( types.length ? '(' + types.join('|') + ')' : '' ) + '</span><a style="display: block; padding: 3px 1px;" target="_blank"  href="'+ aElements[i].href + '" ' + 'title="' + aElements[i].href + '">' + aElements[i].href + '</a></li>');
  }
  
  var display = document.createElement('ul');
  
  display.id = 'display';
  
  display.innerHTML = links.join('');
    
  display.style.position = 'fixed';    
  display.style.top = '5px';
  display.style.left = '2px';
  display.style.textAlign = 'left';
  display.style.backgroundColor = '#ccc';
  display.style.height = '500px';
  display.style.width = '200px';  
  display.style.overflow = 'auto';  
  display.style.color = '#000';    
  display.style.fontFamily = '"Lucida Grande","Lucida Sans Unicode",Helvetica,Arial,Verdana,sans-serif';    
  display.style.fontSize = '11px';
  display.style.zIndex = '999999999';
  display.style.listStyleType = 'none';
  
  var hideDisplay;
  
  display.addEventListener('keypress', hideDisplay, false);  

  hideDisplay = function (event)
  {               
      if (event.keyCode == '27')
      {
        document.getElementById("display").style.display = "none";
      }
  };  
  
  var div = document.createElement('div');
  
  div.innerHTML = 'Close';
  
  div.style.width = '100%';
  div.style.height = '15px';
  div.style.color = '#fff';
  div.style.paddingTop = '20px';  
  div.style.paddingBottom = '33px';  
  div.style.font = '21px arial,helvetica,sans-serif';
  div.style.textAlign = 'center';
  div.style.backgroundColor = '#B0281A';
  div.style.cursor = 'pointer';
  
  div.onclick = function () 
  {
    return document.getElementById("display").style.display = "none";
  };
  
  display.insertBefore(div, display.getElementsByTagName('li')[0]);
    
  // show All images
  var images = document.getElementsByTagName('img');
  
  var imageContainer = document.createElement('div');
  
  for (var j = 0; j < images.length; j++)  
  {
    imageContainer.appendChild(images[j].cloneNode(true));
  }
      
  display.appendChild(imageContainer);    
  document.body.appendChild(display);    
})(window, document);
