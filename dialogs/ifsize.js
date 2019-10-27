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
						type: 'button',
						id: 'browse',
						label: editor.lang.common.browseServer,
						filebrowser: 'basic:file'
					},
					{
						type: 'text',
						maxLength: 2,
						id: 'decimal',
						label: lang.decimalLabel,
						default: 2
					}
				]
			}
		],

		onOk: function(){
			var n = this.getValueOf('basic', 'decimal'),
				units = ['B', 'KB', 'MB', 'GB', 'TB'],
				xhr = new XMLHttpRequest();

			xhr.open('HEAD', this.getValueOf('basic', 'file'), true);
			xhr.onreadystatechange = function(){
				if (this.readyState == this.DONE){
					fsize = parseInt(xhr.getResponseHeader('Content-Length'));
					i = Math.floor(Math.log(fsize) / Math.log(1024));
					editor.insertHtml((fsize / Math.pow(1024, i)).toFixed(n) + ' ' + units[i]);
				}
			};
			xhr.send();
		}
	};
});
