import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PopularTagsComponent } from './popular-tags/popular-tags.component';
import { PagerComponent } from './pager/pager.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PopularTagsComponent,
    PagerComponent,
    ArticleListComponent,
    LoginComponent,
    RegisterComponent,
    ArticleDetailComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
    SettingsComponent,
    ProfileFavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
