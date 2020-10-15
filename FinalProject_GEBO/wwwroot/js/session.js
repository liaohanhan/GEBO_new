//#region --設定session(set)
export function setsession(mid) {
	console.log('setsession:');
	console.log(mid)
	$.session.set("MemberId", mid)
	Redirect()
}
//#endregion
//#region --設定session(set)
export function getsession() {
	console.log('getsession:');
	console.log($.session.get("MemberId"))
}