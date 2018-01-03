import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AllchatPage } from '../allchat/allchat';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AllchatPage;
  tab3Root = ContactPage;
  tab4Root = LoginPage;

  constructor() {

  }
}
