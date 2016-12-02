$(document).ready(function() {

	axios.get('https://api.fixer.io/latest')
		.then(function(response) {

			console.log(response.data);
			app.currencies = response.data.rates;
		})
		.catch(function(error) {

			console.log("ERROR");
		})

});

var app = new Vue({

	el: '#my-div-1',
	
	data: {
		currencies: [],
		rates: [],
		from: '',
		to: '',
		amount: '',
		exchange_rate: '',
		converted_sum: '',
	},

	methods: {

		calcexchangerate: function() {
			if (this.from.length == 0) { alert('Base currency is missing!'); }
			else if (this.to.length == 0) { alert('Target currency is missing!'); }
			else if (this.to == this.from) { alert('Same currency cannot be converted!'); }
			else if (this.amount == '0' || this.amount.length == 0) { alert('Please enter an amount!'); }
			else { this.getrates(this.run_calcs); }
		},

		run_calcs: function() {
			/*
				It's late so I won't bother with a callback function
				for now let's just run the calcs within in the http request.
			*/

			this.exchange_rate = this.rates[this.to];
			var converted_sum_pre = (this.amount * this.rates[this.to]);
			this.converted_sum = this.amount + ' ' + this.from + ' is ' + converted_sum_pre + ' ' + this.to;

			/*
				But I did anyway!
				Hahahaha!!!
			*/
		},

		getrates: function(callback) {

			axios.get('https://api.fixer.io/latest?base=' + this.from)
				.then(function(response) {
					console.log(response.data);

					app.rates = response.data.rates;

					console.log('updated rates');

					callback();

					/*app.exchange_rate = app.rates[app.to];
					var converted_sum_pre = (app.amount * app.rates[app.to]);
					app.converted_sum = app.amount + ' ' + app.from + ' is ' + converted_sum_pre + ' ' + app.to;*/
				})
				.catch(function(error) {
					console.log("ERROR");
				})

		}

	}

});