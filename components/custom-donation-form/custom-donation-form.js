(RaiselyComponents) => class MyRaiselyComponent extends React.Component {
	render() {
      
      	const { DonationForm, Share } = RaiselyComponents.Molecules;
      	const { profile } = this.props.global.campaign;
      	const values = this.props.getValues();
      
      	return (
        	<DonationForm 
              {...this.props}
              profileUuid={profile.uuid}
              currency={profile.currency}
              perks={false}
              recurring={true}
              existingCards={false}
              thankYou={(
                <div>
                  <h3>{values.thankYouTitle}</h3>
                  <p>{values.thankYouMessage}</p>
                  <p>Now share the campaign:</p>
                  <Share 
                    url="https://google.com" 
                    networks={['facebook', 'twitter', 'link', 'email']}
                    size="medium"
                    />
                </div>
              )}
            />
        )
	}
}