(RaiselyComponents, React) => {
	/**
	 * This is the closure area of your custom component, allowing you to
	 * specify and declare code used by your main component. This allows for
	 * a greater amount of complexity in your components while ensuring your
	 * component performs correctly.
	 */

	/**
	 * Anything declared in this area is only available to your custom component.
	 * This is great for text and values that aren't subject to change frequently.
	 */
	const config = {
		defaultTitle: 'My Example Component',
	};

	/**
	 * It's also a great place for us to pull out some commonly used functions
	 * available to us within the Raisely development environment.
	 */

	// first we can pull out useful hooks and components from the main React library
	const { useState, useEffect, useMemo, Fragment } = React;

	// then we can pull out some helpers from Raisely
	// you can read the docs for these at: https://components.raisely.com/?path=/story/helper-api--page
	const {
		api, // an api wrapper for Raisely
		styled, // the emotion styled components method
		css, // the emotion css method
		Common, // a collection of useful helper functions
	} = RaiselyComponents;

	// inside common we have the following common methods
	// you can console.log(common) to see the full list.
	const {
		get, // from lodash
		debounce, // from lodash
		pick, // from lodash
		dayjs, // the date library
		displayCurrency, // displays currencies from cents to their readable unit
		htmr, // htmr package, parses and sanitises html
		qs, // qs library
	} = Common;

	// We can access specific built-in Raisely components through the
	// RaiselyComponents prop as well. All of these are documented here: https://components.raisely.com/?path=/docs/introduction--page
	const { Button } = RaiselyComponents.Atoms;
	const { Accordion } = RaiselyComponents.Molecules;

	/**
	 * Once you've declared your required components, be sure to return the function
	 * representing your final Raisely Component so it can be shown on your page.
	 */
	return (props) => {
		/**
		 * If you declare fields within your Custom Component settings, they can be accessed
		 * by calling props.getValues() if set within your page editor. If values aren't set
		 * while editing, they will not be present on the values object.
		 */
		const values = props.getValues();

		/**
		 * Raisely gives you access to global values that are based on the current state of the page.
		 * The campaign object represents the campaign object returned by Raisely, while user represents
		 * the currently logged in user (if your campaign allows user's to login).
		 * The current object contains data relevant to the current page being viewed.
		 */
		const {
			campaign,
			user,
			current,
		} = useRaisely();

		/**
		 * Depending on the page being viewed, you can also access values such as the currently
		 * displayed profile and post.
		 */
		const {
			profile,
			post,
		} = current;

		/**
		 * You have full access to the React library here, so you can use hooks like useState() and useEffect()
		 * to make your component dynamic, and do things
		 */
		const [buttonClicks, setButtonClicks] = React.useState(0);
		const [topDonation, setTopDonation] = React.useState(null);

		/**
		 * Custom components can also call the Raisely API to either fetch data, or submit data.
		 * You can learn about the API and see code samples here: https://developers.raisely.com/reference
		 *
		 * If you want to fetch information when the component loads, you can use the useEffect() hook.
		 */
		const fetchData = async () => {
			// let's get our highest donation
			const response = await api.all('donations').getAll({
				query: {
					limit: 1,
					sort: 'amount',
					order: 'desc'
				}
			});
			const donations = response.body().data();
			if (donations.data[0]) setTopDonation(donations.data[0]);
		}
		React.useEffect(() => {
			fetchData();
		}, [])

		return (
			<div className="my-custom-component">
				<h1>
					{values.customTitle || config.defaultTitle}
				</h1>
				<div className={css`padding: 20px; border: 2px solid #eee;`}>
					<h3>(Example) Top Donation</h3>
					{topDonation ? (
						<p>Your top donation is {displayCurrency(topDonation.amount, topDonation.currency)} from {topDonation.firstName}</p>
						) : (
							<p>You don't have any donations yet.</p>
						)
					}
				</div>
				<Button
					theme="primary"
					className={css`margin-top: 20px;`}
					onClick={() => {
						// this action is being handled when a user clicks this button
						console.log('This is a button click!');
						setButtonClicks(buttonClicks + 1);
					}}
				>
					Click on the button!
				</Button>
				<p className={css`margin-bottom: 20px;`}>You have clicked the button {buttonClicks} times</p>
				<Accordion
					items={[
						{
							title: 'Ready to learn more about custom components?',
							body: "<p>There's plenty of resources online to get you started. First you can set up your development workflow by reading our <a href=\"https://developers.raisely.com/docs/developer-quickstart\">quickstart guide</a>. That'll introduce you to our CLI for local development, and other resources you need to get started.</p><br /><p>When you're ready to create your first component, check out our <a href=\"https://github.com/raisely/component-templates\">component templates</a> library for ideas and patterns you can copy.</p>",
						}
					]}
				/>
			</div>
		);
	}
}