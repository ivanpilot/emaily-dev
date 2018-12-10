import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component {
    render() {
        return(
            <StripeCheckout 
                name="Emaily" // this will appear on top of the stripe banking form
                description="$5 for 5 email credits" // same as name
                amount={500} //by default stripe goes with (i) USD currency and (ii) cents amount so 500 means 5 USD
                token={token => this.props.handleToken(token)} //expect to receive a callback function that would be called after we have successfully retrieve an authorization token from the strip API.  NOTHING TO DO WITH THE API TOKEN LIKE PUBLIC OR SECRET KEY!!!
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button
                    className="btn"
                >
                    Add Credits
                </button>
            </StripeCheckout> // we can use StripeCheckout as a self closing tag but this doesn't give any option to customize how it will look. To customize the look, we must have StripeCheckout as a wrapping element inside which we pass a child element that will tell how to be displayed
        )
    }
}

//export default Payments;

export default connect(null, actions)(Payments)
