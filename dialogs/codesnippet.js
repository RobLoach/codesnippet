/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

'use strict';

( function() {
	CKEDITOR.dialog.add( 'codeSnippet', function( editor ) {

		var snippetLangs = editor._.codesnippet.langs,
			lang = editor.lang.codesnippet,
			clientHeight = document.documentElement.clientHeight,
			tabulationString = editor.config.codesnippet_tabulation || '    ',
			langSelectItems = [],
			langSelectDefaultValue,
			snippetLangId;

		for ( snippetLangId in snippetLangs )
			langSelectItems.push( [ snippetLangs[ snippetLangId ], snippetLangId ] );

		if ( langSelectItems.length )
			langSelectDefaultValue = langSelectItems[ 0 ][ 1 ];

		// Size adjustments.
		var size = CKEDITOR.document.getWindow().getViewPaneSize(),
			// Make it maximum 800px wide, but still fully visible in the viewport.
			width = Math.min( size.width - 70, 800 ),
			// Make it use 2/3 of the viewport height.
			height = size.height / 1.5;
			// Low resolution settings.
			if ( clientHeight < 650 )
				height = clientHeight - 220;

		return  {
			title: lang.title,
			minHeight: 200,
			resizable: CKEDITOR.DIALOG_RESIZE_NONE,
			contents: [
				{
					id: 'info',
					elements: [
						{
							id: 'lang',
							type: 'select',
							label: lang.language,
							items: langSelectItems,
							'default': langSelectDefaultValue,
							setup: function( widget ) {
								if ( widget.ready )
									this.setValue( widget.data.lang );
							},
							commit: function( widget ) {
								widget.setData( 'lang', this.getValue() );
							}
						},
						{
							id: 'code',
							type: 'textarea',
							label: lang.codeContents,
							setup: function( widget ) {
								this.setValue( widget.data.code );
							},
							commit: function( widget ) {
								widget.setData( 'code', this.getValue() );
							},
							required: true,
							validate: CKEDITOR.dialog.validate.notEmpty( lang.emptySnippetError ),
							inputStyle: 'cursor:auto;' +
								'width:' + width + 'px;' +
								'height:' + height + 'px;' +
								'tab-size:4;' +
								'text-align:left;',
								'class': 'cke_source'
						}
					]
				}
			]
		};
	} );
}() );