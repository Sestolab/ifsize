CKEDITOR.dialog.add('ifsizeDialog', function(editor){
	var lang = editor.lang.ifsize;

	return {
		title: lang.buttonLabel,
		minWidth: 400,
		minHeight: 100,
		contents: [
			{
				id: 'basic',
				elements: [
					{
						type: 'text',
						id: 'file',
						label: lang.fileLabel,
						validate: CKEDITOR.dialog.validate.notEmpty(lang.fileEmpty)
					},
					{
						type: 'hbox',
						children: [
							{
								type: 'button',
								id: 'browseServer',
								label: editor.lang.common.browseServer,
								filebrowser: 'basic:file',
							},
							{
								type: 'file',
								id: 'localFile',
								label: lang.localFile,
								onChange: function(){
									this.getDialog().setValueOf('basic', 'file', this.getValue());
								}
							}
						]
					},
					{
						type: 'text',
						maxLength: 2,
						id: 'decimal',
						label: lang.decimalLabel,
						default: editor.config.ifsizeDecimal || 2,
					}
				]
			}
		],

		onOk: function(){
			var n = this.getValueOf('basic', 'decimal').slice(0,2),
				localFile = this.getContentElement('basic', 'localFile').getInputElement().$.files[0];

			if (localFile){
				ifsize(localFile.size);
				return this.setValueOf('basic', 'localFile', '');
			}else{
				var xhr = new XMLHttpRequest();
				xhr.open('HEAD', this.getValueOf('basic', 'file'), true);
				xhr.onreadystatechange = function(){
					if (this.readyState == this.DONE)
						ifsize(parseInt(xhr.getResponseHeader('Content-Length')));
				};
				xhr.send();
			}
			function ifsize(size){
				var units = ['B', 'KB', 'MB', 'GB', 'TB'],
					i = Math.floor(Math.log(size) / Math.log(1024));
				editor.insertHtml((size / Math.pow(1024, i)).toFixed(n) + ' ' + units[i]);
			}
		}
	};
});
