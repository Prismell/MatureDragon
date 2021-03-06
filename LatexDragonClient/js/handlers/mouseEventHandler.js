const utils = require('../utils')
const instance = require ('../Application')

/**
 * Module containing handlers for all mouse click related events in the game tab.
 * @module mouseEventHandler
 */
var self = module.exports = {
	/**
	 * Set the events for the mouse event in the 'GAME' tab
	 */
	setEvents: () => {
		var obj = instance.gameState.getCurrent().currentState

		//Set body handler for tooltip
		$('body').on('contextmenu', self.bodyTooltipHandler)
		$('body').on('click', self.bodyTooltipHandler)

		for (var i in obj.ids) {
				$('#'+obj.ids[i]).on('contextmenu', { value:obj }, self.contextmenuHandler)

				if (instance.settings.displayTooltip) {
					$('#'+obj.ids[i]).on('mouseover', { value:obj.rules }, self.mouseoverHandler)
					$('#'+obj.ids[i]).on('mouseleave', self.mouseleaveHandler)
					$('#'+obj.ids[i]).on('mousemove', self.mousemoveHandler)
				}

				if (instance.settings.highlighting) {
					$('#'+obj.ids[i]).on('mouseover', function (event) { event.stopPropagation(); $(this).css('text-shadow', '0 0 8px ' + instance.settings.highlightColor); })
					$('#'+obj.ids[i]).on('mouseleave', function (event) { event.stopPropagation(); $(this).css('text-shadow', ''); })
					$('#'+obj.ids[i]).on('mouseout', function (event) { event.stopPropagation(); $(this).css('text-shadow', ''); })
				}
		}
	},

	/**
	 * Handler of the mouseover event, when triggered create the tooltip and displays it.
	 * @param {Event} event jQuery Event object
	 */
	mouseoverHandler: function (event) {
		event.stopPropagation()

		var id = $(this).attr('id')

		self.getTooltipList(event.data.value, id)

		if ($('#tooltip:hidden'))
			$('#tooltip').show(100)

		self.checkForTooltipSize(event.pageX, event.pageY)
		$('#tooltip').css('top', event.pageY+10)
		$('#tooltip').css('left', event.pageX+10)
	},

	/**
	 * Handler of the mouseleave event, when triggered hide the tooltip.
	 * @param {Event} event jQuery Event object
	 */
	mouseleaveHandler: function (event) {
		event.stopPropagation()

		$('#tooltip').hide()
	},

	/**
	 * Handler of the mousemove event, when triggered update the position of the tooltip.
	 * @param {Event} event jQuery Event object
	 */
	mousemoveHandler: (event) => {
		event.stopPropagation()

		self.checkForTooltipSize(event.pageX, event.pageY)
		$('#tooltip:visible').css('top', event.pageY+10)
		$('#tooltip:visible').css('left', event.pageX+10)
	},

	/**
	 * Handler of the contextmenu event, when triggered create the tooltip and displays it
	 * but also deactivate the mouseover, mouseleave and mousemove handlers this
	 * way the tooltip stay in place.
	 * @param {Event} event jQuery Event object
	 */
	contextmenuHandler: function (event) {
		event.stopPropagation()
		var id = $(this).attr('id')

		self.getTooltipList(event.data.value.rules, id)

		if ($('#tooltip:hidden'))
			$('#tooltip').show(100)
		self.checkForTooltipSize(event.pageX, event.pageY)
		$('#tooltip').css('top', event.pageY+10)
		$('#tooltip').css('left', event.pageX+10)

		for (var i in event.data.value.ids) {
			$('#' + event.data.value.ids[i]).off('mouseover')
			$('#' + event.data.value.ids[i]).off('mouseleave')
			$('#' + event.data.value.ids[i]).off('mousemove')
		}
	},

	/**
	 * Create the list of elements that the tooltip displays.
	 * @param {Object} list list of elements to be displayed in the tooltip
	 * @param {String} id id of the elment who triggered the event, used to display the correct informations
	 */
	getTooltipList: (list, id) => {
		const gameHandler = require('./gameHandler')

		var options = new Array()

		for (var i in list) {
			if (list[i][id] != undefined) {
				for (var j in list[i][id])
					options.push(list[i][id][j])
			}
		}

		$('#tooltip-container').html('')
		for (var i in options) {
			var obj = {expId:id, ruleId:options[i].ruleId, context:options[i].type}
			var color = 'info'

			if (options[i].type == 'contextMenu') color = 'success'
			else if (options[i].type == 'drag_and_drop') color = 'danger'

			var tmp = $('<a>' + options[i].text + '</a>').on(
				'click', { value:obj }, gameHandler.gameRuleRequest).addClass('list-group-item tooltip-content').addClass('list-group-item-' + color)
			$('#tooltip-container').append(tmp)
		}

		utils.typesetMath(null, 'tooltip')
	},

	/**
	 * Function handling the closing of the tooltip after the oncontextmenu event
	 * and reseting the handlers.
	 * @param {Event} event jQuery Event object
	 */
	bodyTooltipHandler: (event) => {
		if ($('#tooltip').is(':visible')) {
			$('#tooltip').hide()

			for (var i in instance.gameState.getCurrent().currentState.ids)
				$('#' + instance.gameState.getCurrent().currentState.ids[i]).off('contextmenu')

				self.setEvents()
		}
	},

	/**
	 * Set the tooltip size depending on the size of the screen.
	 * The size of the tooltip is 700*500 (couting the scrollbars) if there is
	 * enough space on the screen, otherwise the size of the tooltip is whatever
	 * space is left.
	 * The calcul is screenWidth - (cursorX + offsetFromTheCursor + scrollbarSize)
	 * and the same from the height.
	 * @param {int} cursorX X position of the cursor on the screen
	 * @param {int} cursorY Y position of the cursor on the screen
	 */
	checkForTooltipSize: (cursorX, cursorY) => {
		var width, height
		var screenWidth = $(document).width(), screenHeight = $(document).height()
		var tooltipMaxWidth = screenWidth - (cursorX + 10 + 8), tooltipMaxHeight = screenHeight - (cursorY + 10 + 8)

		if (tooltipMaxWidth >= 700)
			width = 700
		else
			width = tooltipMaxWidth

		if (tooltipMaxHeight >= 500)
			height = 500
		else
			height = tooltipMaxHeight

		$('#tooltip-container').width(width)
		$('#tooltip-container').height(height)

	}
}
