// ==UserScript==
// @name		Kingsage Conquer
// @version		2.0.2
// @author		grafilicious
//
// @include		http://*.kingsage.*/game.php?*s=info_village*
// @include		http://*.kingsage.*/game.php?*s=map*
// @include		http://*.kingsage.*/game.php?*s=ally*
// @include		http://*.kingsage.*/game.php?*s=info_ally*
//
// @require 	http://i.egoserv.com/conquer/md5.min.js
//
// @history 15.08.2011 - add - added player, ally to allyRes table
// @history 15.08.2011 - change - on settlement info after booking, the delete link pops up without refresh and vice versa
// @history 16.08.2011 - fix - reset last viewed settlement on map refresh
// @history 16.08.2011 - fix - own settlements are not displayed as free on map any longer
// @history 16.08.2011 - change - getBookings Button on Map is gone, bookings are fetched every load and scroll
// @history 17.08.2011 - fix - fixed behaviour for abandoned settlements and players without an alliance
// @history 24.08.2011 - add - delete reservations via allypage
// @history 13.09.2011 - add - you can now view reservations for an alliance via the alliances page
// @history 14.10.2011 - change - redesigned the planner tab completely, now we have subtabs for own-, allyreservations and administration
// @history 15.10.2011 - add - added some eycandy (fadeIn, fadeOut) on the planner page when switching between tabs
// @history 22.10.2011 - add - you can now see reservations of confederate alliances in the planner tab and on every alliances page
// @history 08.11.2011 - fix - ud 2.0.0 caused username problems
// @history 17.02.2012 - fix - ud 2.1.0 caused map problems
// @history 24.05.2012 - fix - calling planner page multiple times kept rebinding events
// @history 31.10.2012 - change - complete rewrite
// @history 05.11.2013 - fix - kingsage changed domains, adapted includes
// @history 09.01.2013 - fix - map walker bug
// ==/UserScript==

//* select language

function selectLanguage(lang){
	switch(lang) {
		case 'kingsage.de':
		case 'de.kingsage.gameforge.com':
			return getGerman();
			break;
		case 'kingsage.org':
		case 'en.kingsage.gameforge.com':
		case 'kingsage.com':
		case 'us.kingsage.gameforge.com':
			return getEnglish();
			break;
		default:
			return getEnglish();
	}
}

//* i18n

var getGerman = function() {
	var languageGer = [];

	languageGer['nickname'] = 'Nickname';
	languageGer['password'] = 'Passwort';
	languageGer['login'] = 'Login';
	languageGer['player'] = 'Spieler';
	languageGer['ally'] = 'Allianz';
	languageGer['noReservations'] = 'keine Reservierungen';
	languageGer['nameInPlanner'] = 'Allianzname (im Adelsplaner)';
	languageGer['coordinates'] = 'Koordinaten';
	languageGer['bookedAt'] = 'Reserviert am';
	languageGer['bookedUntil'] = 'Reserviert bis';
	languageGer['planner'] = 'Adelsplaner';
	languageGer['noPacts'] = 'keine Bündnisse';
	languageGer['noPactRequests'] = 'keine Anfragen';
	languageGer['currentPacts'] = 'Aktuelle NAPs/BNDs';
	languageGer['pactRequests'] = 'NAP/BND Anfragen';
	languageGer['requestPact'] = 'NAP/BND Anfrage tätigen';
	languageGer['request'] = 'Anfragen';
	languageGer['requestPactQuestion'] = 'Wirklich Bündnisanfrage senden?';
	languageGer['requestPactSuccess'] = 'Bündnisanfrage erfolreich gesendet';
	languageGer['allyNotExistant'] = 'Diese Allianz existiert nicht';
	languageGer['requestPactAlreadyExists'] = 'Es besteht bereits eine Beziehung zu dieser Allianz';
	languageGer['requestPactOwnAlly'] = 'Du kannst kein Bündnis mit deiner eigenen Allianz eingehen';
	languageGer['requestPactWrongServer'] = 'Diese Allianz existiert nur auf einer anderen Welt';
	languageGer['requestPactError'] = 'Ein Fehler ist aufgetreten, bitte versuche es erneut';
	languageGer['pactType'] = 'Art des Bündnisses';
	languageGer['pactTypeBND'] = 'BND';
	languageGer['pactTypeNAP'] = 'NAP';
	languageGer['cancelPact'] = 'Auflösen';
	languageGer['confirmPact'] = 'Annehmen';
	languageGer['declinePact'] = 'Ablehnen';
	languageGer['confirmPactSuccess'] = 'Erfolgreich angenommen';
	languageGer['declinePactSuccess'] = 'Erfolgreich abgelehnt';
	languageGer['cancelPactSuccess'] = 'Erfolgreich aufgelöst';
	languageGer['confirmPactQuestion'] = 'Wirklich annehmen?';
	languageGer['cancelPactQuestion'] = 'Wirklich auflösen?';
	languageGer['declinePactQuestion'] = 'Wirklich ablehnen?';
	languageGer['error'] = 'Ein Fehler ist aufgetreten';
	languageGer['myReservations'] = 'Meine Reservierungen';
	languageGer['bndReservations'] = 'Reservierungen von Verbündeten';
	languageGer['allyReservations'] = 'Reservierungen der Allianz';
	languageGer['administration'] = 'Verwaltung';
	languageGer['allyName'] = 'Allianzname';
	languageGer['allyJoin'] = 'Beitreten';
	languageGer['allyCreate'] = 'Gründen';
	languageGer['settlementFree'] = 'ist noch frei';
	languageGer['settlementBookedByYou'] = 'ist bereits von dir reserviert';
	languageGer['settlementBookedNAP'] = 'ist bereits von jemand anderem reserviert';
	languageGer['settlementBookedAlly'] = 'ist bereits von %s reserviert';
	languageGer['book'] = 'In Adelsplaner eintragen';
	languageGer['deleteReservation'] = 'Aus Adelsplaner löschen';
	languageGer['delete'] = 'Löschen';
	languageGer['free'] = 'Frei';
	languageGer['bookedByYou'] = 'Bereits von dir reserviert';
	languageGer['bookedNAP'] = 'Bereits von jemand anderem reserviert';
	languageGer['bookedAlly'] = 'Bereits von %s reserviert';
	languageGer['bookSuccess'] = 'Erfolgreich eingefügt';
	languageGer['bookFail'] = 'Zu spät, ein anderer war schneller';
	languageGer['bookDelete'] = 'Reservierung aufgehoben';
	languageGer['wrongpw'] = 'Falsches Passwort';
	languageGer['joinSuccess'] = 'Erfolgreich Beigetreten';
	languageGer['createSuccess'] = 'Allianz wurde erfolgreich erstellt';
	languageGer['allyAlreadyExists'] = 'Diese Allianz gibt es schon';
	languageGer['leaveAlly'] = 'Diese Allianz (im Adelsplaner) verlassen';
	languageGer['leaveAllyQuestion'] = 'Allianz wirklich verlassen?';
	languageGer['toolpage'] = 'Zum Adelsplaner';
	languageGer['infoAllyRes'] = 'Reservierungen deiner Allianz';
	languageGer['ajaxFailed'] = 'Zeitüberschreitung bei der Bearbeitung, bitte versuche es erneut';
	languageGer['noally'] = 'Du bist derzeit kein Mitglied in einer (Adelsplaner) Allianz';
	languageGer['retry'] = 'Nochmal versuchen';
	languageGer['nouser'] = 'Diesen Benutzer gibt es nicht.';

	return languageGer;
};

var getEnglish = function() {
	var languageEn = [];

	languageEn['nickname'] = 'Nickname';
	languageEn['password'] = 'Password';
	languageEn['login'] = 'Login';
	languageEn['player'] = 'Player';
	languageEn['ally'] = 'Alliance';
	languageEn['noReservations'] = 'no reservations';
	languageEn['nameInPlanner'] = 'Alliancename (in planner)';
	languageEn['coordinates'] = 'Coordinates';
	languageEn['bookedAt'] = 'Booked at';
	languageEn['bookedUntil'] = 'Booked Until';
	languageEn['planner'] = 'Planner';
	languageEn['noPacts'] = 'no Pacts';
	languageEn['noPactRequests'] = 'no Requests';
	languageEn['currentPacts'] = 'Current NAPs/Allies';
	languageEn['pactRequests'] = 'NAP/Ally Requests';
	languageEn['requestPact'] = 'Request NAP/Ally';
	languageEn['request'] = 'Request';
	languageEn['requestPactQuestion'] = 'Are you sure you want to request a pact?';
	languageEn['requestPactSuccess'] = 'Request sent successful';
	languageEn['allyNotExistant'] = 'Alliance doesn\'t exist';
	languageEn['requestPactAlreadyExists'] = 'A relation to this Alliance already exists';
	languageEn['requestPactOwnAlly'] = 'You can\'t make a relation to your own Alliance';
	languageEn['requestPactWrongServer'] = 'This Alliance doesn\'t exist on this world';
	languageEn['requestPactError'] = 'An error occured, please try again';
	languageEn['pactType'] = 'Type of Pact';
	languageEn['pactTypeBND'] = 'Ally';
	languageEn['pactTypeNAP'] = 'NAP';
	languageEn['cancelPact'] = 'Cancel';
	languageEn['confirmPact'] = 'Confirm';
	languageEn['declinePact'] = 'Decline';
	languageEn['confirmPactSuccess'] = 'Successfully confirmed';
	languageEn['declinePactSuccess'] = 'Successfully declined';
	languageEn['cancelPactSuccess'] = 'Successfully cancelled';
	languageEn['confirmPactQuestion'] = 'Are you sure you want to confirm?';
	languageEn['cancelPactQuestion'] = 'Are you sure you want to cancel?';
	languageEn['declinePactQuestion'] = 'Are you sure you want to decline?';
	languageEn['error'] = 'An error occured';
	languageEn['myReservations'] = 'My Reservations';
	languageEn['bndReservations'] = 'Pact Reservations';
	languageEn['allyReservations'] = 'Alliance Reservations';
	languageEn['administration'] = 'Administration';
	languageEn['allyName'] = 'Alliancename';
	languageEn['allyJoin'] = 'Join';
	languageEn['allyCreate'] = 'Create';
	languageEn['settlementFree'] = 'is still free';
	languageEn['settlementBookedByYou'] = 'is already taken by you';
	languageEn['settlementBookedNAP'] = 'is already taken by someone else';
	languageEn['settlementBookedAlly'] = 'is already taken by %s';
	languageEn['book'] = 'book';
	languageEn['deleteReservation'] = 'delete';
	languageEn['delete'] = 'delete';
	languageEn['free'] = 'free';
	languageEn['bookedByYou'] = 'Already taken by you';
	languageEn['bookedNAP'] = 'Already taken by someone else';
	languageEn['bookedAlly'] = 'Already booked by %s';
	languageEn['bookSuccess'] = 'Successfully booked';
	languageEn['bookFail'] = 'Someone else was first';
	languageEn['bookDelete'] = 'Reservation deleted';
	languageEn['wrongpw'] = 'Wrong Password';
	languageEn['joinSuccess'] = 'Successfully joined';
	languageEn['createSuccess'] = 'Successfully created the alliance';
	languageEn['allyAlreadyExists'] = 'This Alliance already exists';
	languageEn['leaveAlly'] = 'Leave this Alliance (in planner)';
	languageEn['leaveAllyQuestion'] = 'Are you sure you want to leave this Alliance?';
	languageEn['toolpage'] = 'To the Planner';
	languageEn['infoAllyRes'] = 'Reservations of your Alliance';
	languageEn['ajaxFailed'] = 'The request to the server failed to resolve in time, please try again';
	languageEn['noally'] = 'You are currently not enlisted in an Alliance (planner)';
	languageEn['retry'] = 'Click here to retry';
	languageEn['nouser'] = 'No such user';

	return languageEn;
};

var init = function($) {

	//* selecting current language based on the domain we are running on

	var languageSelector = location.host; // e.g. s1.kingsage.de
		languageSelector = languageSelector.substring(languageSelector.indexOf('.') + 1, languageSelector.length); // e.g. kingsage.de
	var lang = selectLanguage(languageSelector);

	//* globals
	var url 		= 'http://bigell.bplaced.net/kaa/pages/',
		toolpage 	= url + 'login.php',
		apipage 	= 'http://bigell.bplaced.net/kaa/conquer/api/conquer.api.php',
		// success & fail colors
		green 		= '#32CD32',
		red 		= '#DC143C',
		// document vars
		host 		= location.host,
		server 		= location.host.split('.')[0].substr(1),
		title 		= document.title,
		self 		= title.substring(title.indexOf('- ') + 1, title.lastIndexOf(' -')),
		page 		= document.URL,
		arrow		= '<img src="/img/arrow_right_raquo.png">';

	var spinner 		= '<img src="data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPj4+Dg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==">',
		loadingStyle 	= 'style="display: inline-block; height: 16px; min-width: 16px;"';

	var printf = function(string, s) { return string.replace('%s', s); };
	var identifyActiveTab = function(link) { return ($('td[background*="s_back"]').find('a[href*="' + link + '"]').length != 0); };

	var ajaxCall = function(request, d) {
		$('#loading').html(spinner);
		var dataString = 'request=' + request + '&server=' + d.server;

		switch(request) {
			case 'login':
				dataString += '&username=' + d.nick + '&password=' + d.passwd; break;
			case 'arraycheck':
			case 'check':
				dataString += '&coords=' + d.coords; break;
			case 'delete':
				dataString += '&id=' + d.id; break;
			case 'reserve':
				dataString += '&coords=' + d.coords + '&player=' + d.player + '&ally=' + d.ally; break;
			case 'chgReq':
				dataString += '&aid=' + d.aid + '&type=' + d.type; break;
			case 'sendRequest':
				dataString += '&name=' + d.name + '&type=' + d.type; break;
			case 'checkOwnRes':
			case 'checkStatus':
			case 'checkBNDNAP':
			case 'checkRequests':
			case 'leaveAlly':
				dataString = dataString; break;
			case 'checkAllyRes':
				dataString += '&ally=' + d.ally + '&type=' + d.type; break;
			case 'joinAlly':
			case 'createAlly':
				dataString += '&ally=' + d.ally + '&password=' + d.password; break;
		}

		var options = { type: 'GET', dataType: 'jsonp',	data: dataString, jsonp: 'jsonp_callback', timeout: 5000, url: apipage };

		if(d.successFnc || d.errorFnc) {
			if(d.successFnc) { options['success'] 	= d.successFnc; }
			if(d.errorFnc) 	 { options['error'] 	= d.errorFnc; 	}

			$.ajax(options);
		} else {
			return $.ajax(options);
		}
	};

	var ajaxError = function() {
		$('#loading').html('<span style="font-weight: bold; color: ' + red + '">' + lang['ajaxFailed'] + '</span>');
		switch(true) {
			case /ally/.test(page):
				break;
			case /map/.test(page):
				$('#loading').before('<p class="click" id="reload">' + arrow + ' ' + lang['retry'] + '</p>');
				$('#reload').on('click', function() {
					stateChange();
					$(this).fadeOut(function() { $(this).remove(); });
				})
				break;
			case /info_village/.test(page):
				break;
			case /info_ally/.test(page):
				break;
		}
	};

	var responseData = function(args) {
		var o = [];
		if(args[0][0] === undefined) { 	//only one request
			o.push(args[0]);
		} else { 						//more requests -> loop
			for(var arg in args) {
				if(args.hasOwnProperty(arg)) {
					o.push(args[arg][0]);
				}
			}
		}
		return o;
	}

	var presentLoginForm = function(elemToReplace, reload){
		var loginForm  = '<form><input type="hidden" name="usescript" value="1">';
			loginForm += lang['nickname'] + ': <input type="text" id="nick" name="nick">';
			loginForm += lang['password'] + ': <input type="password" id="passwd" name="passwd"> ';
			loginForm += '<input id="subLog" type="submit" value="' + lang['login'] + '"></form>';

		$(elemToReplace).html(loginForm);
		$('#subLog').on('click', function(event){
			var data = {
				nick: $('#nick').val(),
				passwd: hex_md5($('#passwd').val()),
				server : server,
				successFnc: function(data) {
					$('#loading').empty();
					if(data.answer == 'success') {
						if(reload) {
							location.reload();
						} else {
							showPlanner();
						}
					} else {
						$('#loading').after('<span id="error" style="color:' + red + '; font-weight: bold;">' + lang[data.answer] + '');
						setTimeout(function() {
							$('#error').fadeOut(function() {
								$(this).remove();
							})
						}, 1000);
					}
				},
				errorFnc: ajaxError
			};
			ajaxCall('login', data);
			event.preventDefault();
		});
	};

	// build result tables with data recieved via ajax
	var buildTable = function(elem, data) {
		var o = '';
		for(var i in data) {
			if(data.hasOwnProperty(i)) {
				var d = data[i];
				if(d.request == 'checkOwnRes' || d.request == 'checkAllyRes') {	//own reservations & allly or bnd reservations
					if(d.reservations == false) {
						o += '<span>' + lang['noReservations'] + '</span>';
					} else {
						var r = d.reservations;
						o += '<table class="borderlist" style="width:820px;"><tbody><tr>' + ((d.request == 'checkOwnRes') ? '' : '<th>' + lang['nickname'] + '</th><th>' + lang['ally'] + '</th>') + '<th>' + lang['coordinates'] + '</th><th>' + lang['player'] + '</th><th>' + lang['ally'] + '</th><th>' + lang['bookedAt'] + '</th><th>' + lang['bookedUntil'] + '</th>' + ((d.request == 'checkOwnRes') ? '<th>' + lang['delete'] + '</th>' : '') + '</tr>';
						$.each(r, function(i) {
							var xy = r[i]['coords'].split('|'), x = xy[0], y = xy[1], continent = 'K' + y.charAt(0) + x.charAt(0);
							o += '<tr>' + ((d.request == 'checkOwnRes') ? '' : '<td>' + r[i]['nick'] + '</td><td>' + r[i]['name'] + '</td>') + '<td><a target="_blank" href="game.php?s=map&x=' + x + '&y=' + y + '">' + r[i]['coords'] + '</a> ' + continent + '</td><td>' + r[i]['player'] + '</td><td>' + r[i]['ally'] + '</td><td>' + r[i]['date'] + '</td><td>' + r[i]['date_to'] + '</td>' + ((d.request == 'checkOwnRes') ? '<td><a data-id="' + r[i]['id'] + '" id="del_' + r[i]['id'] + '" name="delete_' + r[i]['id'] + '" href="#delete_' + r[i]['id'] + '">' + lang['delete'] + '</a></td>' : '') + '</tr>';
						});
						o += '</tbody></table>';
					}
				} else if(d.request == 'checkBNDNAP' || d.request == 'checkRequests') {		//bndnap and requests
					var id 	 = d.id,
						name = d.name,
						type = d.type;
						o += (d.request == 'checkBNDNAP') ? '<h3 id="pacts">' + lang['currentPacts'] + '</h3>' : '<h3 id="pactRequests">' + lang['pactRequests'] + '</h3>';
					if(d.answer == 'none') {
						o += '<span>' + ((d.request == 'checkBNDNAP') ? lang['noPacts'] : lang['noPactRequests']) + '</span>';
					} else {
						o += '<table class="borderlist" style="width:820px;"><tbody><tr><th>ID</th><th>' + lang['nameInPlanner'] + '</th><th>' + lang['pactType'] + '</th><th>' + ((d.request == 'checkBNDNAP') ? lang['cancelPact'] : lang['confirmPact'] + '/' + lang['declinePact']) + '</th></tr>';
						$.each(id, function(i) {
							o += '<tr><td>' + id[i] + '</td><td>' + name[i] + '</td><td>' + type[i] + '</td><td>' + ((d.request == 'checkBNDNAP') ? '<a class="manipulatePact" rel="cancelPact" id="' + id[i] + '" href="#cancelPact' + id[i] + '">' + lang['cancelPact'] + '</a>' : '<a class="manipulatePact" rel="confirmPact" id="' + id[i] + '" href="#confirmPact' + id[i] + '">' + lang['confirmPact'] + '</a> / <a class="manipulatePact" rel="declinePact" id="' + id[i] + '" href="#declinePact' + id[i] + '">' + lang['declinePact'] + '</a>') + '</td></tr>';
						});
						o += '</tbody></table>';
					}
					o += '<br />';
				}
			}
		}
		elem.html(o);
	};

	//############## KINGSAGE CONQUER ##############//

	if(page.match('s=ally')) {
		//############## ALLY ##############//

		$('div[class|="contentpane"]').eq(1).children('div').eq(0).find('td > img[src*="menue"]:last').parent().after('<td><img src="img/tabs/menue_n_left.png"></td><td background="img/tabs/menue_n_back.png"><a name="planner" id="planner" href="#planner">' + lang['planner'] + '</a></td><td><img src="img/tabs/menue_n_right.png"></td>');

		$('#planner').on('click', function() { showPlanner(); });

		var createSubTabLine = function(active) {
			// array of the tabline elements with label:id
			var tabLine = ["myReservations", "allyReservations", "bndReservations", "administration"],
				leader  = $('#leaderInfo').attr('leader'),
				result 	= '',
				imgSrc	= 'n';
			// pop the administration label when user is no leader
			if(leader == 'false') {	tabLine.pop() }
			// create the HTML for the remaining elements in the tabLine
			for(var i = 0; i < tabLine.length; i++) {
				imgSrc = (active == tabLine[i]) ? 's' : 'n';
				result += '<td><img src="img/tabs/menue_' + imgSrc + '_left.png"></td><td background="img/tabs/menue_' + imgSrc + '_back.png"><a class="plannerTab" id="' + tabLine[i] + '" href="#planner#' + tabLine[i] + '">' + lang[tabLine[i]] + '</a></td><td><img src="img/tabs/menue_' + imgSrc + '_right.png"></td>';
			}
			return result;
		};

		var requestAndRefresh = function() {
			$.when.apply(this, arguments).then(
				function() {
					var args = responseData(arguments);
					$('#loading').empty();
					buildTable($('#ajaxContent'), args);
				}, ajaxError
			);
		};

		var showPlanner = function() {
			// disable page reload when an attack is due, so we dont get disturbed in our new tab
			if(page.match('attack')) { $('td[class*="list"]').find('span').removeAttr('reload'); }
			//show all other tabs as inactive, show planner tab as active, remove all other content
			$('div[class="contentpane"]').eq(1).children('div:first').find('img[src*="s_left"], img[src*="s_right"], img[src*="ns_center"], img[src*="sn_center"], td[background*="s_back"], img[src*="n_left"]:last, td[background*="n_back"]:last, img[src*="n_right"]:last')
				.each(function(i) {
					var src = $(this).attr('src') || $(this).attr('background'), src = (i <= 2) ? src.replace('s_', 'n_').replace('_s', '_n') : src.replace('n_', 's_');
					$(this).attr('src', src).attr('background', src);
				}).end().nextAll().remove().end().after('<br /><span ' + loadingStyle + ' id="loading"></span><div id="conquerContainer"><div style="margin-bottom: 10px;" id="header"></div><div id="content"></div><div id="ajaxContent"></div></div>');

			var checkStatus  = ajaxCall('checkStatus', { server: server }),
				checkOwnRes	 = ajaxCall('checkOwnRes', { server: server });

			$.when(checkStatus, checkOwnRes).then(
				function(checkStatus, checkOwnRes) {
					var checkStatus = checkStatus[0], checkOwnRes = checkOwnRes[0];
					$('#loading').empty();
					$('#header').append('<p><a name="tool" target="_blank" href="' + toolpage + '" id="tool"><img alt="" src="img/arrow_right_raquo.png"> ' + lang['toolpage'] + '</a></p>');
					if(checkStatus.answer == 'nosession' || checkOwnRes.answer == 'nosession') {
						//we are not logged in
						presentLoginForm('#conquerContainer', false);
					} else if(checkStatus.leader == 'noally') {
						//user wants to create/join an ally
						$('#ajaxContent').append('<h3>' + lang['noally'] + '</h3><form id="allyForm"><select id="allySelect"><option rel="join">' + lang['allyJoin'] + '</option><option rel="create">' + lang['allyCreate'] + '</option></select> ' + lang['allyName'] + ': <input id="allyName" type="text"> ' + lang['password'] + ': <input id="allyPassword" type="password"> <input id="allySubmit" type="submit" value="' + lang['allyJoin'] + '">');
						//change text of button according to whether we want to join or create
						$('#allySelect').change(function() { $('#allySubmit').val($(this).val()); });

						$('#allySubmit').live('click', function(event) {
							var select 	= $('#allySelect').val(),
								rel 	= $('#allySelect').find('option:selected').attr('rel'),
								data 	= { server: server, ally: $('#allyName').val(), password: hex_md5($('#allyPassword').val()) },
								answers = {
									create: {
										allynameexist: 		'<span id="allyAnswer" style="color: ' + red + '; font-weight: bold;">' + lang['allyAlreadyExists'] + '</span>',
										success: 			'<span id="allyAnswer" style="color: ' + green + '; font-weight: bold;">' + lang['createSuccess'] + '</span>'
									},
									join: {
										allynamenoexist: 	'<span id="allyAnswer" style="color: ' + red + '; font-weight: bold;">' + lang['allyNotExistant'] + '</span>',
										wrongpasswd: 		'<span id="allyAnswer" style="color: ' + red + '; font-weight: bold;">' + lang['wrongpw'] + '</span>',
										success: 			'<span id="allyAnswer" style="color: ' + green + '; font-weight: bold;">' + lang['joinSuccess'] + '</span>'
									}
								},
								promise = (select == lang['allyJoin']) ? ajaxCall('joinAlly', data) : ajaxCall('createAlly', data);

							$.when(promise).then(
								function(data) {
									$('#loading').empty();
									$('#allyForm').after(answers[rel][data.answer]);
									setTimeout(function() {
										if(data.answer == 'success') {
											showPlanner();
										} else {
											$('#allyAnswer').fadeOut(300, function() { $(this).remove(); });
										}
									}, 1000);
								}, ajaxError
							);
							event.preventDefault();
						});

					} else {
						$('#header').append('<span id=leaderInfo leader="' + checkStatus.leader + '" style="display:none;"></span>')
							.append('<p><a name="leaveAlly" href="#leaveAlly" id="leaveAlly"><img alt="" src="img/arrow_right_raquo.png"> ' + lang['leaveAlly'] + '</a></p><br />')
							.append('<div id="subTabRow" style="background-image:url(img/tabs/menue_back.png); background-position:left; background-repeat:repeat-x; width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr id="tabRow"></tr></tbody></table></div><br />');

						$('#tabRow').append(createSubTabLine('myReservations'));
						//show checkAllyRes data via buildtable
						buildTable($('#ajaxContent'), [checkOwnRes]);

						//event handling
						$('#header').on('click', 'a.plannerTab', function() {
							$('#content, #ajaxContent').empty();
							$('#tabRow').html(createSubTabLine($(this).attr('id')));

							switch($(this).attr('id')) {
								case 'myReservations':
									requestAndRefresh(ajaxCall('checkOwnRes', { server: server }));
									break;
								case 'allyReservations':
									requestAndRefresh(ajaxCall('checkAllyRes', { server: server, ally: '%', type: 0 }));
									break;
								case 'bndReservations':
									requestAndRefresh(ajaxCall('checkAllyRes', { server: server, ally: '%', type: 1 }));
									break;
								case 'administration':
									$('#content').prepend('<h3 id="addPact">' + lang['requestPact'] + '</h3>').append('<form id="requestForm"><select id="requestSelect"><option>' + lang['pactTypeBND'] + '</option><option>' + lang['pactTypeNAP'] + '</option></select> ' + lang['allyName'] + ': <input id="requestName" type="text"> <input id="requestSubmit" type="submit" value="' + lang['request'] + '"></form><br />');
									requestAndRefresh(
										ajaxCall('checkBNDNAP', { server: server }),
										ajaxCall('checkRequests', { server: server }));
									break;
							}
						});

						//event for leaving an alliance
						$('#leaveAlly').on('click', function() {
							if(confirm(lang['leaveAllyQuestion'])) {
								ajaxCall('leaveAlly', {server: server, successFnc: showPlanner, errorFnc: ajaxError });
							}
						});

						//event for deleting one of your own reservations
						$('#ajaxContent').on('click', 'a[id*="del_"]', function() {
							ajaxCall('delete', { server: server, id: $(this).data('id'), successFnc: function() { requestAndRefresh(ajaxCall('checkOwnRes', { server: server })); } });
						});

						//event for canceling/confirming/declining a pact
						$('#ajaxContent').on('click', 'a.manipulatePact', function() {
							var elem	= $(this),
								rel 	= elem.attr('rel'),
								id 		= elem.attr('id'),
								answers = {
									cancelPact: {
										q: 		 lang['cancelPactQuestion'],
										type: 	 'del',
										success: '<span style="color: ' + green + '; font-weight: bold;">' + lang['cancelPactSuccess'] + '</span>',
										error: 	 '<span style="color: ' + red + '; font-weight: bold;">' + lang['error'] + '</span>',
									},
									confirmPact: {
										q: 		 lang['confirmPactQuestion'],
										type: 	 'acc',
										success: '<span style="color: ' + green + '; font-weight: bold;">' + lang['confirmPactSuccess'] + '</span>',
										error: 	 '<span style="color: ' + red + '; font-weight: bold;">' + lang['error'] + '</span>'
									},
									declinePact: {
										q: 		 lang['declinePactQuestion'],
										type: 	 'del',
										success: '<span style="color: ' + green + '; font-weight: bold;">' + lang['declinePactSuccess'] + '</span>',
										error: 	 '<span style="color: ' + red + '; font-weight: bold;">' + lang['error'] + '</span>'
									}
								};

							if(confirm(answers[rel].q)) {
								var promise = ajaxCall('chgReq', { server: server, aid: id, type: answers[rel].type });
								$.when(promise).then(
									function(data) {
										$('#loading').empty();
										$('#ajaxContent').prepend(answers[rel][data.answer]);
										requestAndRefresh(
											ajaxCall('checkBNDNAP', { server: server }),
											ajaxCall('checkRequests', { server: server }));
									}, ajaxError
								);
							}
						});

						$('#content').on('click', '#requestSubmit', function(event) {
							var answers = {
								success: 		'<span id="requestPactAnswer" style="color: ' + green + '; font-weight: bold;">' + lang['requestPactSuccess'] + '</span>',
								allynotexist: 	'<span id="requestPactAnswer" style="color: ' + red + '; font-weight: bold;">' + lang['allyNotExistant'] + '</span>',
								alreadyexist: 	'<span id="requestPactAnswer" style="color: ' + red + '; font-weight: bold;">' + lang['requestPactAlreadyExists'] + '</span>',
								ownally: 		'<span id="requestPactAnswer" style="color: ' + red + '; font-weight: bold;">' + lang['requestPactOwnAlly'] + '</span>',
								diffserver: 	'<span id="requestPactAnswer" style="color: ' + red + '; font-weight: bold;">' + lang['requestPactWrongServer'] + '</span>',
								error: 			'<span id="requestPactAnswer" style="color: ' + red + '; font-weight: bold;">' + lang['requestPactError'] + '</span>'
							};

							if(confirm(lang['requestPactQuestion'])) {
								var promise = ajaxCall('sendRequest', { server: server, name: $('#requestName').val(), type: $('#requestSelect').val() });
								$.when(promise).then(
									function(data) {
										$('#loading').empty();
										$('#requestForm').after(answers[data.answer]);
										setTimeout(function() {
											$('#requestPactAnswer').fadeOut(300);
										}, 1000);
									}, ajaxError
								);
							}
							event.preventDefault();
						});
					}
				}, ajaxError
			);
		};

	} else if(page.match('s=map')) {
		//############## MAP ##############//

		//Will be called on any scroll event, collects the map data. handels data requests to the server and handles mouseover for all villages
		var stateChange = function() {
			var xyarray = [];

			$('td[class*="occupied"] > div > a').each(function() {
				var meta = $(this).parent().html();
					meta = meta.substring(meta.indexOf('onmouseover'), meta.indexOf('onmouseout')-1);

				var metaArr 	= meta.split(','),
					coords 		= metaArr[1].match(/\d{3}\|\d{3}/g);
					playerName 	= metaArr[3].substr(2, metaArr[3].indexOf(' (') - 2) || '-',
					allyName 	= metaArr[4].substr(2, metaArr[4].indexOf(' (') - 2) || '-';

				xyarray.push(coords);

				$(this).attr({
					xy: coords,
					player: playerName,
					ally: allyName
				});
			});

			var arraycheck = ajaxCall('arraycheck', {server: server, coords: xyarray });

			$.when(arraycheck).then(
				function(arraycheck) {
					$('#loading').empty();
					if(arraycheck.answer == 'nosession') {
						//we are not logged in
						presentLoginForm('#conquerContainer', true);
					} else {
						var answers	= arraycheck.answer,
							bookers	= arraycheck.booker;

						$('td[class*="occupied"] > div > a').each(function(i) {
							$(this).attr('status', answers[i]);
							if(answers[i] == 'r') {	$(this).attr('booker', bookers[i]); }
						});
					}
				}, ajaxError
			);

			$('td[class*="occupied"]').on('mouseover', function() {
				var elem 		= $(this).find('a'),
					status 		= elem.attr('status'),
					booker 		= elem.attr('booker'),
					xy 			= elem.attr('xy'),
					matcher		= elem.attr('player'),
					player 		= (matcher == '-') ? '' : matcher,
					ally		= (elem.attr('ally') == '-') ? '' : ' [' + elem.attr('ally') + ']' ,
					playerAlly 	= player + ally;

				if(!self.match(matcher)) {
					if(status == 'f') {
						$('h2#check').css({color: green}).html(xy + ' ' + playerAlly + ' ' + lang['settlementFree']);
					} else if(status == 'm') {
						$('h2#check').css({color: red}).html(xy + ' ' + playerAlly + ' ' + lang['settlementBookedByYou']);
					} else if(status == 'r') {
						if(booker != 'undefined') {
							$('h2#check').css({color: red}).html(xy +' ' + playerAlly+' ' + printf(lang['settlementBookedAlly'], booker));
						} else {
							$('h2#check').css({color: red}).html(xy + ' ' + playerAlly + ' ' + lang['settlementBookedNAP']);
						}
					}
				}
			});
		}

		$(document).ready(function() {
			$('.contentpane > h1').after('<span style="display: inline-block; height: 16px; min-width: 16px;" id="loading"></span><div id="conquerContainer"><h2 style="display: inline-block; margin: 0; line-height: 16px; vertical-align: top;" id="check"></h2></div>');
			$('td[title], div[id*="minimap"]').live('click', stateChange);
			stateChange();
		});

	} else if(page.match('s=info_village')) {
		//############## INFO VILLAGE ##############//

		var showRequestMessages = function(status, id, func) {
			$('#status').replaceWith(status);
			$(id).fadeOut(300, func);
		};

		// Assembles data about the village we are looking at
		var table 	= $('table.borderlist').eq(2),
			data 	= table.find('td:odd').not('.text_info'),
			coords	= $(data).eq(0).text(),
			player	= $(data).eq(2).find('a').text()|| '-',
			ally	= $(data).eq(3).text() || '-';

		// We don't allow reservations for our own settlements
		if(!self.match(player)) {

			//Uihook
			var uiHook 		= '<span ' + loadingStyle + ' id="loading"></span><div id="conquerContainer"></div>',
				book 		= '<p><a name="insert" href="#insert" id="insert">' + arrow + ' ' + lang['book'] + '</a></p>',
				unbook 		= '<p><a name="delete" href="#delete" id="delete">' + arrow + ' ' + lang['deleteReservation'] + '</a></p>';

			table.after(uiHook);
			var container 	= $('#conquerContainer');

			//Check status of the settlement
			var check = ajaxCall('check', {server: server, coords: coords});

			$.when(check).then(
				function(check) {
					//Handle nosession
					$('#loading').empty();
					if(check.answer == 'nosession') {
						//we are not logged in
						presentLoginForm('#conquerContainer', true);
					} else if(check.answer == 'free') {
						//Settlement is free
						container.append('<span id="status" style="color: ' + green + '; font-weight: bold;" id="free">' + lang['free'] + '</span>' + book);
					} else if(check.answer == 'mine') {
						//Settlement is reserved by player
						container.append('<span id="status" style="color: ' + red + '; font-weight: bold;">' + lang['bookedByYou'] + '</span>' + unbook);
					} else if(check.answer == 'reserved') {
						//Settlement is reservered by either allymate or by pactpartner
						if(check.booker != 'undefined') {
							container.append('<span id="status" style="color: ' + red + '; font-weight: bold;">' + printf(lang['bookedAlly'], check.booker) + '</span><br />');
						} else {
							container.append('<span id="status" style="color: ' + red + '; font-weight: bold;">' + lang['bookedNAP'] + '</span><br />');
						}
					}

					$('#conquerContainer').on('click', '#insert', function() {
						var reserveSuccess = function(data) {
							$('#loading').empty();
							if(data.answer == 'nosession') {
								//we are not logged in
								presentLoginForm('#conquerContainer', true);
							} else if(data.answer == 'booked') {
								showRequestMessages('<span id="status" style="color: ' + green + '; font-weight: bold;">' + lang['bookSuccess'] + '</span>', '#insert', function() {
									$(this).replaceWith(unbook).fadeIn(300); $('#status').nextUntil(':not(br)').remove();
								});
							} else if(data.answer == 'reserved') {
								showRequestMessages('<span id="status" style="color: ' + red + ' font-weight: bold;">' + lang['bookFail'] + '</span>', '#insert', function() {
									$('#status').nextUntil(':not(br)').remove();
								});
							}
						};
						ajaxCall('reserve', {server: server, coords: coords, player: player, ally: ally, successFnc: reserveSuccess });
					});

					$('#conquerContainer').on('click', '#delete', function() {
						var deleteSuccess = function(data) {
							$('#loading').empty();
							if(data.answer == 'nosession') {
								//we are not logged in
								presentLoginForm('#conquerContainer', true);
							} else if(data.answer == 'deleted') {
								showRequestMessages('<span id="status" style="color: ' + green + '; font-weight: bold;">' + lang['bookDelete'] + '</span>', '#delete', function() {
									$(this).replaceWith(book).fadeIn(300); $('#status').nextUntil(':not(br)').remove();
								});
							}
						};
						ajaxCall('delete', { server: server, coords: coords, successFnc: deleteSuccess });
					});
				}, ajaxError
			);
		}

	} else if(page.match('s=info_ally') && identifyActiveTab('s=info_ally&m=profile')) {
		//############## INFO ALLY ##############//

		var table 	= $('table.borderlist'),
			allytag = table.eq(2).find('td:odd').eq(1).text(),
			uiHook  = '<span ' + loadingStyle + ' id="loading"></span><div id="conquerContainer"></div><br />';

		table.last().before(uiHook);

		var infoAlly = ajaxCall('checkAllyRes', { server: server, ally: allytag, type: 0 }),
			infoBnd  = ajaxCall('checkAllyRes', { server: server, ally: allytag, type: 1 });

		$.when(infoAlly, infoBnd).then(
			function() {
				var args = responseData(arguments);
				$('#loading').empty();
				if(args[0].answer == 'nosession' || args[1].answer) {
					//we are not logged in
					presentLoginForm('#conquerContainer', true);
				} else {
					$('#conquerContainer').append('<h3>' + lang['infoAllyRes'] + '</h3><div id="infoAllyRes"></div><h3>' + lang['bndReservations'] + '</h3><div id="infoBndRes"></div>');
					buildTable($('#infoAllyRes'), [args[0]]);
					buildTable($('#infoBndRes'),  [args[1]]);
				}
			}, ajaxError
		);
	}
};

(function () {
	var $ = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow.jQuery : jQuery || $;
	init($);
})();