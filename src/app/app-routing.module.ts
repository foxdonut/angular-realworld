import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFavoritesComponent } from './profile/profile-favorites/profile-favorites.component';
import { ProfileAuthorComponent } from './profile/profile-author/profile-author.component';
import { SettingsComponent } from './settings/settings.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleResolver } from './resolvers/article.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'article/:slug', component: ArticleDetailComponent },
  { path: 'editor', component: ArticleEditComponent },
  { path: 'editor/:slug', component: ArticleEditComponent, resolve: { article: ArticleResolver } },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile/:username', component: ProfileComponent, children: [
    { path: '', component: ProfileAuthorComponent },
    { path: 'favorites', component: ProfileFavoritesComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
