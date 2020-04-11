import { Component } from '@angular/core';
import { CreateItemResponse } from './shared/models/app.models';
import { DataService } from './shared/services/data.services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finance-app';
  public access_token: string;
  // variables to maintain the sum of all types of accounts
  public net_worth: number;
  public checking_amount: number;
  public savings_amount: number;
  public credit_card_amount: number;
  public investment_amount: number;
  public loan_amount: number;
  public currency_symbol: string;

  public item_fetched: CreateItemResponse;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.net_worth = 0;
    this.checking_amount = 0;
    this.savings_amount = 0;
    this.credit_card_amount = 0;
    this.investment_amount = 0;
    this.loan_amount = 0;
    this.currency_symbol = '$';
    this.getCreateItemStaticResponse().subscribe(res => {
      this.item_fetched = res;
      this.fetchDataForAllAccountTypes(this.item_fetched);
    }, err => {

    });
  }
  ngOnDestroy() {

  }
  onPlaidSuccess($event: any) {
    console.log('onPlaidSuccess executed');
    console.log($event, '$event');
    if ($event !== undefined && $event.token !== undefined) {
      this.access_token = $event.token;
      console.log(this.access_token, 'access_token');
      const response = $event;
      const accounts = response.metadata.accounts;


      accounts.forEach(element => {

      });

      // extract the data for all accounts and show it on UI
      this.fetchDataForAllAccountTypes($event);
      // Call Backend API sending access token
      const tokenExchangeReponse = this.dataService.exchangePublicToken(this.access_token);
    }
  }
  onPlaidExit($event: any) {
    console.log('onPlaidExit executed');
  }
  onPlaidLoad($event: any) {
    console.log('onPlaidLoad executed');
  }
  onPlaidEvent($event: any) {
    console.log('onPlaidEvent executed');
  }
  onPlaidClick($event: any) {
    console.log('onPlaidClick executed');
  }
  fetchDataForAllAccountTypes(responseObj: CreateItemResponse) {
    this.item_fetched = responseObj;
    this.currency_symbol = this.item_fetched.accounts[0].balances.currency;
    this.item_fetched.accounts.forEach(element => {
      const accountType = element.type;
      switch (accountType) {
        case 'depository':
          const savings_available_amount = element.balances.available;
          this.savings_amount = this.savings_amount + savings_available_amount;
          break;
        case 'credit':
          const credit_available_amount = element.balances.current;
          this.credit_card_amount = this.credit_card_amount + credit_available_amount;
          break;
        case 'investment':
          const investment_available_amount = element.balances.current;
          this.investment_amount = this.investment_amount + investment_available_amount;
          break;
        case 'loan':
          const loan_available_amount = element.balances.current;
          this.loan_amount = this.loan_amount + loan_available_amount;
          break;
        case 'checking':                  // check and update this string to the value coming in the response
          const checking_available_amount = element.balances.current;
          this.checking_amount = this.checking_amount + checking_available_amount;
          break;
      }
    });
    this.net_worth = this.net_worth + (this.savings_amount + this.investment_amount + this.checking_amount) - (this.credit_card_amount + this.loan_amount);
  }
  getCreateItemStaticResponse() {
    return this.dataService.getCreateItemResponse();
  }
  getRoundedOffVal(value: string) {
    let roundedOffVal = '0';
    if (value !== null && value !== undefined && value !== '') {
      if (parseFloat(value) > 0 && (parseFloat(value) * 10) % 10 === 0) {
        roundedOffVal = value;
      } else if (parseFloat(value) > 0) {
        value = parseFloat(value).toFixed(2);
        roundedOffVal = value;
      }
    }
    return roundedOffVal;
  }
}
