/* ----------------------------------------------------------------------------------
	Flaminwork Javascript Framework
	
	Version:	0.1beta
	Encoding:	UTF-8
	Authors:	
		Juan G. Hurtado 	[juan.g.hurtado@gmail.com]
		Álvaro Fernández 	[creativo@alvarografico.es]
-------------------------------------------------------------------------------------
	Table of contents
-------------------------------------------------------------------------------------
	1.	EXPAND BLOCKS
	2.	STYLE HELPER
---------------------------------------------------------------------------------- */

if (typeof jQuery != "undefined") {
	
	/* =EXPAND BLOCKS
	----------------------------------------------------------------------------------
	2.1.Resumen:
	
		Este script nos permitirá definir bloques expandibles, esto es, bloques
		que se mostrarán u ocultarán mediante el pulsado de otro elemento.
	
	2.2.Funcionamiento:
	
		El script busca dos elementos que deben estar envueltos dentro de otro
		cuya clase CSS debe ser "expand-wrapper":
		
		- Un elemento con clase CSS "expand-title", que actuará como "gatillo"
			para mostrar u ocultar el bloque destino
		- Un elemento con clase CSS "expand-body", que será el bloque que se
			mostrará u ocultará según el caso
			
		Una vez encontrados todos estos elementos, el funcionamiento por defecto
		del script será el de ocultar el bloque con clase CSS "expand-body",
		aunque podemos modificar este comportamiento haciendo que el bloque
		sea visible añadiendo la clase "visible" al bloque.
		
		Además de ocultar o mostrar este bloque en la carga de la página, el
		script añade un evento "onclick" al elemento con clase CSS "expand-title".
		Este evento se dispara al clickar en el elemento, y se encargará de mostrar
		u ocultar el bloque con clase CSS "expand-body" según convenga: lo ocultará
		si era visible, y lo mostrará si estaba oculto.
		
		En el proceso se añaden y quitan una serie de clases CSS a ciertos elementos
		para facilitar su estilizado:
		
		- Al elemento con clase "expand-title":
			* Se le añade la clase "opened" si el bloque destino está visible
			* Se le añade la clase "closed" si el bloque destino está oculto
	
	2.3.Estructuras HTML de ejemplo:
		
		Ejemplo simple:
		
		<div class="expand-wrapper">
			<h1 class="expand-title">expand-title</h1>
			<p class="expand-body">Lorem ipsum dolor sit amet…</p>
		</div>
		
		Ejemplo con el bloque destino definido como visible en la carga de página:
		
		<div class="expand-wrapper">
			<p><strong class="expand-title">expand-title</strong></p>
			<div class="expand-body visible">
				<p>Lorem ipsum dolor sit amet…</p>
				<p>Lorem ipsum dolor sit amet…</p>
			</p>
		</div>
	---------------------------------------------------------------------------------- */
	var expand = {
		init : function() {
			jQuery('.expand-wrapper').filter(function() {
				return !jQuery(this).find('.expand-title').hasClass('closed') && !jQuery(this).find('.expand-title').hasClass('opened');
			})
			.find('.expand-body:not(.visible)').hide()
			.end().find('.expand-title:first').each(function() {
				var element = jQuery(this).parents('.expand-wrapper:first').find('.expand-body');
				if (element.css('display') == "none") {
					element.addClass('hidden');
					jQuery(this).addClass('closed');
					element.parents('.expand-wrapper:first').removeClass('current');
				}
				else {
					element.addClass('visible');
					jQuery(this).addClass('opened');
					element.parents('.expand-wrapper:first').addClass('current');
				}
			}).css('cursor','pointer')
			.bind('click',function(e) {
				var element = jQuery(this).parents('.expand-wrapper:first').find('.expand-body:first');

				jQuery(this).toggleClass('closed');
				jQuery(this).toggleClass('opened');
				
				element.toggleClass('visible');
				element.toggleClass('hidden');
				
				var fade = element.hasClass('fade');
				
				if (element.css('display') == "none") {
					element.parents('.expand-wrapper:first').toggleClass('current');
					if (fade) {
						element.fadeIn(200);
					} else {
						element.slideDown('slow');
					}
				} else {
					if (fade) {
						element.fadeOut(200, function() {
							element.parents('.expand-wrapper:first').toggleClass('current');
						});
					} else {
						element.slideUp('slow', function() {
							element.parents('.expand-wrapper:first').toggleClass('current');
						});
					}
				}
				
				e.preventDefault();
			});
		}
	};
	
	/* =STYLE HELPER
	----------------------------------------------------------------------------------
	5.1.Resumen:
	
		Este script engloba algunos metodos para facilitar la estilización de
		elementos de manera sencilla, supliendo algunas de las carencias de soporte
		en lo referente a CSS. P. ej. un metodo para añadir clases CSS específicas
		al primer y al último elemento de un grupo.
	
	5.2.Funcionamiento:
	
		firstLast(parent,child): Este método busca todos los "children" dentro de "parent",
								y al primero le coloca la clase CSS "first" y al último
								la clase CSS "last"
								
		odd(parent,child): Este método busca todos los "children" dentro de "parent",
								y coloca la clase CSS "par" a los pares, e "impar" a los
								impares
								
		addHover(elements): Este método añade la clase CSS "hover" a todos los "elements"
								cuando el ratón pasa por encima de ellos y lo quita cuando
								ya no pasa por encima
	
	---------------------------------------------------------------------------------- */
	var styleHelper = {

		firstLast : function(parent, child) {
			jQuery(parent).each(function() {
				jQuery(this).children(child +':first')
					.addClass('first');
				
				jQuery(this).children(child +':last')
					.addClass('last');
			});
		},
		
		evenOdd : function(parent, child) {
			jQuery(parent).each(function() {
				// No seguimos el nombrado lógico para la clase, ya que jQuery
				// obtiene los pares/impares según un índice 0, es decir, para
				// jQuery el primero elemento de una lista es par porque su
				// índice es igual a cero, siendo impar el segundo elemento.
				// Para nuestras intenciones este comportamiento no es correcto
				jQuery(this).children(child +':even')
					.addClass('odd');
				
				jQuery(this).children(child +':odd')
					.addClass('even');
			});
		},
		
		addHover : function(elements) {
			jQuery(elements).hover(function() {
				jQuery(this).addClass('hover');
			}, function() {
				jQuery(this).removeClass('hover')
			});
		}
	};
	
}