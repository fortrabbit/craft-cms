(function($) {


var CP = Garnish.Base.extend({

	$header: null,
	$notificationWrapper: null,
	$notificationContainer: null,
	$notifications: null,

	fixedNotifications: false,

	tabs: null,
	selectedTab: null,

	init: function()
	{
		this.$header = $('#header');

		// Fade the notification out in two seconds
		this.$notificationWrapper = $('#notifications-wrapper');
		this.$notificationContainer = $('#notifications');
		this.$notifications = this.$notificationContainer.children();
		this.$notifications.delay(CP.notificationDuration).fadeOut();

		this.addListener(Garnish.$win, 'scroll', 'onWindowScroll');
		this.onWindowScroll();

		// Tabs
		this.tabs = {};
		var $tabs = $('#tabs a');

		// Find the tabs that link to a div on the page
		for (var i = 0; i < $tabs.length; i++)
		{
			var $tab = $($tabs[i]),
				href = $tab.attr('href');

			if (href && href.charAt(0) == '#')
			{
				this.tabs[href] = {
					$tab: $tab,
					$target: $(href)
				};

				this.addListener($tab, 'activate', 'selectTab');
			}

			if (!this.selectedTab && $tab.hasClass('sel'))
			{
				this.selectedTab = href;
			}
		}

		// Secondary form submit buttons
		$('.formsubmit').click(function() {
			var $btn = $(this),
				$form = $btn.closest('form');

			if ($btn.attr('data-action'))
			{
				$('<input type="hidden" name="action" value="'+$btn.attr('data-action')+'"/>').appendTo($form);
			}

			if ($btn.attr('data-redirect'))
			{
				$('<input type="hidden" name="redirect" value="'+$btn.attr('data-redirect')+'"/>').appendTo($form);
			}

			$form.submit();
		});
	},

	/**
	 * Handle stuff that should happen when the window scrolls
	 */
	onWindowScroll: function()
	{
		this.onWindowScroll._scrollTop = Garnish.$win.scrollTop();
		this.onWindowScroll._headerHeight = this.$header.height();

		if (this.onWindowScroll._scrollTop > this.onWindowScroll._headerHeight)
		{
			if (!this.fixedNotifications)
			{
				this.$notificationWrapper.addClass('fixed');
				this.fixedNotifications = true;
			}

		}
		else
		{
			if (this.fixedNotifications)
			{
				this.$notificationWrapper.removeClass('fixed');
				this.fixedNotifications = false;
			}
		}
	},

	/**
	 * Dispays a notification.
	 *
	 * @param string type
	 * @param string message
	 */
	displayNotification: function(type, message)
	{
		$('<div class="notification '+type+'">'+message+'</div>')
			.appendTo(this.$notificationContainer)
			.fadeIn('fast')
			.delay(CP.notificationDuration)
			.fadeOut();
	},

	/**
	 * Displays a notice.
	 *
	 * @param string message
	 */
	displayNotice: function(message)
	{
		this.displayNotification('notice', message);
	},

	/**
	 * Displays an error.
	 *
	 * @param string message
	 */
	displayError: function(message)
	{
		this.displayNotification('error', message);
	},

	/**
	 * Select a tab
	 */
	selectTab: function(ev)
	{
		if (!this.selectedTab || ev.currentTarget != this.tabs[this.selectedTab].$tab[0])
		{
			// Hide the selected tab
			if (this.selectedTab)
			{
				this.tabs[this.selectedTab].$tab.removeClass('sel');
				this.tabs[this.selectedTab].$target.addClass('hidden');
			}

			var $tab = $(ev.currentTarget).addClass('sel');
			this.selectedTab = $tab.attr('href');
			this.tabs[this.selectedTab].$target.removeClass('hidden');
		}
	}

},
{
	notificationDuration: 2000
});


Blocks.cp = new CP();


})(jQuery);
