/* ----------------------------------------------------------------------------------
	Flaminwork Javascript Framework
	
	Version:	0.1-RC2
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
	---------------------------------------------------------------------------------- */
	var expand = {
		init : function(callback) {
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
				
				if (typeof callback == "function") {
					callback(jQuery(this), e);
				}
				
				e.preventDefault();
			});
		}
	};
	
	/* =STYLE HELPER
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