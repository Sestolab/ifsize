CKEDITOR.plugins.add('ifsize', {
	requires: 'dialog',
	lang: 'en,ru,uk',
	icons: 'ifsize',
	init: function (editor){
		editor.addCommand('ifsize', new CKEDITOR.dialogCommand('ifsizeDialog'));
		editor.ui.addButton('ifsize', {
			label: editor.lang.ifsize.buttonLabel,
			command: 'ifsize'
		});
		CKEDITOR.dialog.add('ifsizeDialog', this.path + 'dialogs/ifsize.js');
	}
});
