import React, { Component } from 'react';
import StripeCheckout       from 'react-stripe-checkout';

class Payments extends Component {
    render() {

        return (
            <StripeCheckout 
                name="EmailerHawk"
                description="Pay $5 for 5 Survey Credits"
                amount={500}
                token={token => console.log(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="waves-effect waves-light btn yellow darken-1">
                    Add Credits
                </button>
            </StripeCheckout>
        )
    }
}

export default Payments;