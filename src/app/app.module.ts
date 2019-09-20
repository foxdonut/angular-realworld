import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
import { CredentialsComponent } from './credentials/credentials.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFavoritesComponent } from './profile/profile-favorites/profile-favorites.component';
import { ProfileAuthorComponent } from './profile/profile-author/profile-author.component';
import { ProfileContentComponent } from './profile/profile-content/profile-content.component';

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
    CredentialsComponent,
    ProfileComponent,
    ProfileFavoritesComponent,
    ProfileAuthorComponent,
    ProfileContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
