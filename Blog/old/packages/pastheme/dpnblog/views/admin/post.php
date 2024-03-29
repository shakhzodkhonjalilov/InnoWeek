<?= $view->script('admin-posts' , 'dpnblog:app/bundle/admin-posts.js' , 'vue') ?>

<div id="posts" class="uk-form" v-cloak>

   <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
      <div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>
         <h2 class="uk-margin-remove" v-if="!selected.length">{{ count }} {{ count > 1 ? 'Posts':'Post' | trans }} </h2>
         <template v-else>
            <h2 class="uk-margin-remove">{{ '{1} %count% Post selected|]1,Inf[ %count% Posts selected' | transChoice selected.length {count:selected.length} }}</h2>
            <div class="uk-margin-left" >
               <ul class="uk-subnav pk-subnav-icon">
                  <li><a class="pk-icon-check pk-icon-hover" title="Publish" data-uk-tooltip="{delay: 500}" @click="status(2)"></a></li>
                  <li><a class="pk-icon-block pk-icon-hover" title="Unpublish" data-uk-tooltip="{delay: 500}" @click="status(3)"></a></li>
                  <li><a class="pk-icon-copy pk-icon-hover" title="Copy" data-uk-tooltip="{delay: 500}" @click="copy"></a></li>
                  <li><a class="pk-icon-delete pk-icon-hover" title="Delete" data-uk-tooltip="{delay: 500}" @click="remove" v-confirm="'Delete Posts?'"></a></li>
               </ul>
            </div>
         </template>

         <div class="pk-search">
            <div class="uk-search">
               <input class="uk-search-field" type="text" v-model="config.filter.search" debounce="300">
            </div>
         </div>
      </div>
      <div data-uk-margin>
         <a class="uk-button uk-button-primary" :href="$url.route('admin/dpnblog/posts/edit')">{{'Add Post'| trans }}</a>
      </div>
   </div>

    <div class="uk-overflow-container">
        <table class="uk-table uk-table-hover uk-table-middle">
            <thead>
                <tr>
                    <th class="pk-table-width-minimum"><input type="checkbox" v-check-all:selected.literal="input[name=id]" number></th>
                    <th class="pk-table-min-width-200" v-order:title="config.filter.order">{{ 'Title' | trans }}</th>
                    <th class="pk-table-width-100 uk-text-center">
                        <input-filter :title="$trans('Status')" :value.sync="config.filter.status" :options="statusOptions"></input-filter>
                    </th>
                    <th class="pk-table-width-100">
                        <span v-if="!canEditAll">{{'Author'| trans }}</span>
                        <input-filter :title="$trans('Author')" :value.sync="config.filter.author" :options="authors" v-else></input-filter>
                    </th>
                    <th class="pk-table-width-150">
                        <div class="uk-form-select pk-filter" data-uk-form-select="{target:'a'}">
                            <span> {{'Category'| trans }} <i class="uk-icon-filter"></i></span>
                            <select v-model="config.filter.category">
                                <option value="">{{'All' | trans}}</option>
                                <option v-for="cat in categories" v-bind:value="cat.id">{{cat.title}}</option>
                            </select>
                        </div>
                    </th>
                    <th class="pk-table-width-100" v-order:date="config.filter.order">{{'Date'| trans }}</th>
                    <th class="pk-table-width-100">{{'Post Style'| trans }}</th>
                    <th class="pk-table-width-200 pk-table-min-width-200">{{'URL'| trans }}</th>
                </tr>
            </thead>
            <tbody class="uk-text-small">
                <tr class="check-item" v-for="post in posts" :class="{'uk-active': active(post)}">
                    <td><input type="checkbox" name="id" :value="post.id"></td>
                    <td>
                        <a :href="$url.route('admin/dpnblog/posts/edit', { id: post.id })">{{ post.title }}</a>
                    </td>
                    <td class="uk-text-center">
                        <a :title="getStatusText(post)" :class="{
                        'pk-icon-circle': post.status == 0,
                        'pk-icon-circle-warning': post.status == 1,
                        'pk-icon-circle-success': post.status == 2 && post.published,
                        'pk-icon-circle-danger': post.status == 3,
                        'pk-icon-schedule': post.status == 2 && !post.published
                    }" @click="toggleStatus(post)"></a>
                    </td>
                    <td>
                        <a :href="$url.route('admin/user/edit', { id: post.user_id })">{{ post.author }}</a>
                    </td>
                    <td>
                        {{post.categories}}
                    </td>
                    <td>
                        {{ post.date | date }}
                    </td>
                    <td class="pk-table-text-break">
                        <span class="uk-text-muted">{{ post.post_name }}</span>
                    </td>
                    <td class="pk-table-text-break">
                        <a target="_blank" v-if="post.accessible && post.url" :href="this.$url.route(post.url.substr(1))">{{ decodeURI(post.url) }}</a>
                        <span v-if="!post.accessible && post.url">{{ decodeURI(post.url) }}</span>
                        <span v-if="!post.url">{{ 'Disabled' | trans }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

   <h3 class="uk-h1 uk-text-muted uk-text-center" v-show="posts && !posts.length">{{ 'No posts found.' | trans }}</h3>
   <v-pagination :page.sync="config.page" :pages="pages" v-show="pages > 1 || page > 0"></v-pagination>
</div>
