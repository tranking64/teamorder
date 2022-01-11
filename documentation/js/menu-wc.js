'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">teamorder documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-8895f936d7543fc86ed5102a66c19443819317c35398a78e80f5500b58018a2ab110042b90be90097504122cff65f7b5d0bc88802350ee61fee3189488d49dc6"' : 'data-target="#xs-components-links-module-AppModule-8895f936d7543fc86ed5102a66c19443819317c35398a78e80f5500b58018a2ab110042b90be90097504122cff65f7b5d0bc88802350ee61fee3189488d49dc6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-8895f936d7543fc86ed5102a66c19443819317c35398a78e80f5500b58018a2ab110042b90be90097504122cff65f7b5d0bc88802350ee61fee3189488d49dc6"' :
                                            'id="xs-components-links-module-AppModule-8895f936d7543fc86ed5102a66c19443819317c35398a78e80f5500b58018a2ab110042b90be90097504122cff65f7b5d0bc88802350ee61fee3189488d49dc6"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExploreContainerComponentModule.html" data-type="entity-link" >ExploreContainerComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ExploreContainerComponentModule-f6ea2f3a37a409e782e878132417e160cf77fa0ec810d2e5cc3642af37918fb50562eba3a5194cf88483d3cbd97cd30c37d5f4767ebce2bf4dbbd50f06e2def3"' : 'data-target="#xs-components-links-module-ExploreContainerComponentModule-f6ea2f3a37a409e782e878132417e160cf77fa0ec810d2e5cc3642af37918fb50562eba3a5194cf88483d3cbd97cd30c37d5f4767ebce2bf4dbbd50f06e2def3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExploreContainerComponentModule-f6ea2f3a37a409e782e878132417e160cf77fa0ec810d2e5cc3642af37918fb50562eba3a5194cf88483d3cbd97cd30c37d5f4767ebce2bf4dbbd50f06e2def3"' :
                                            'id="xs-components-links-module-ExploreContainerComponentModule-f6ea2f3a37a409e782e878132417e160cf77fa0ec810d2e5cc3642af37918fb50562eba3a5194cf88483d3cbd97cd30c37d5f4767ebce2bf4dbbd50f06e2def3"' }>
                                            <li class="link">
                                                <a href="components/ExploreContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExploreContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPwPageModule.html" data-type="entity-link" >ForgotPwPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ForgotPwPageModule-1b3af505a52999a8b2418328b5a4411f4b461417f28d9ca05ec20557b43444787f99f434a782227d9dfbbee1941f1ccd67bbf62bb26833f274dcc59a823e908b"' : 'data-target="#xs-components-links-module-ForgotPwPageModule-1b3af505a52999a8b2418328b5a4411f4b461417f28d9ca05ec20557b43444787f99f434a782227d9dfbbee1941f1ccd67bbf62bb26833f274dcc59a823e908b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForgotPwPageModule-1b3af505a52999a8b2418328b5a4411f4b461417f28d9ca05ec20557b43444787f99f434a782227d9dfbbee1941f1ccd67bbf62bb26833f274dcc59a823e908b"' :
                                            'id="xs-components-links-module-ForgotPwPageModule-1b3af505a52999a8b2418328b5a4411f4b461417f28d9ca05ec20557b43444787f99f434a782227d9dfbbee1941f1ccd67bbf62bb26833f274dcc59a823e908b"' }>
                                            <li class="link">
                                                <a href="components/ForgotPwPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPwPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPwPageRoutingModule.html" data-type="entity-link" >ForgotPwPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-1c3652f7c5a7607efa31d921fe042292bc064f8aef4ed560ac2ffbcdbe23b4afd2d7c142bef5f106754d26b9460726027d118e414f6bc72f0a7895c901fa4d40"' : 'data-target="#xs-components-links-module-LoginPageModule-1c3652f7c5a7607efa31d921fe042292bc064f8aef4ed560ac2ffbcdbe23b4afd2d7c142bef5f106754d26b9460726027d118e414f6bc72f0a7895c901fa4d40"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-1c3652f7c5a7607efa31d921fe042292bc064f8aef4ed560ac2ffbcdbe23b4afd2d7c142bef5f106754d26b9460726027d118e414f6bc72f0a7895c901fa4d40"' :
                                            'id="xs-components-links-module-LoginPageModule-1c3652f7c5a7607efa31d921fe042292bc064f8aef4ed560ac2ffbcdbe23b4afd2d7c142bef5f106754d26b9460726027d118e414f6bc72f0a7895c901fa4d40"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NewPwPageModule.html" data-type="entity-link" >NewPwPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewPwPageModule-ac53572f022ef7229b38e16f26fdbf26df32e6a80df9631d13422cea1453e6ece37e6ecbbfaac2be96d714196961e92ebb58abb14c057bfdb64f26c057db103a"' : 'data-target="#xs-components-links-module-NewPwPageModule-ac53572f022ef7229b38e16f26fdbf26df32e6a80df9631d13422cea1453e6ece37e6ecbbfaac2be96d714196961e92ebb58abb14c057bfdb64f26c057db103a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewPwPageModule-ac53572f022ef7229b38e16f26fdbf26df32e6a80df9631d13422cea1453e6ece37e6ecbbfaac2be96d714196961e92ebb58abb14c057bfdb64f26c057db103a"' :
                                            'id="xs-components-links-module-NewPwPageModule-ac53572f022ef7229b38e16f26fdbf26df32e6a80df9631d13422cea1453e6ece37e6ecbbfaac2be96d714196961e92ebb58abb14c057bfdb64f26c057db103a"' }>
                                            <li class="link">
                                                <a href="components/NewPwPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewPwPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewPwPageRoutingModule.html" data-type="entity-link" >NewPwPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SignupPageModule.html" data-type="entity-link" >SignupPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SignupPageModule-b1a7bd6848be852ec44c81adce547c4af28e2bb344017c130ca0feccc995abfd096a581728fe2540c41566b3dd9c86c6d825e4e95b701010eb3d9a221f0c7d90"' : 'data-target="#xs-components-links-module-SignupPageModule-b1a7bd6848be852ec44c81adce547c4af28e2bb344017c130ca0feccc995abfd096a581728fe2540c41566b3dd9c86c6d825e4e95b701010eb3d9a221f0c7d90"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SignupPageModule-b1a7bd6848be852ec44c81adce547c4af28e2bb344017c130ca0feccc995abfd096a581728fe2540c41566b3dd9c86c6d825e4e95b701010eb3d9a221f0c7d90"' :
                                            'id="xs-components-links-module-SignupPageModule-b1a7bd6848be852ec44c81adce547c4af28e2bb344017c130ca0feccc995abfd096a581728fe2540c41566b3dd9c86c6d825e4e95b701010eb3d9a221f0c7d90"' }>
                                            <li class="link">
                                                <a href="components/SignupPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignupPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SignupPageRoutingModule.html" data-type="entity-link" >SignupPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageModule.html" data-type="entity-link" >Tab1PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab1PageModule-9021517ddba37032dd18c1d90fee452e14e2fd1fa587c78d68c7b32dca5af7cca335b70ef9d93429592a7982d2bdf647f1d092754c94fc73ed152e1d48e334b4"' : 'data-target="#xs-components-links-module-Tab1PageModule-9021517ddba37032dd18c1d90fee452e14e2fd1fa587c78d68c7b32dca5af7cca335b70ef9d93429592a7982d2bdf647f1d092754c94fc73ed152e1d48e334b4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab1PageModule-9021517ddba37032dd18c1d90fee452e14e2fd1fa587c78d68c7b32dca5af7cca335b70ef9d93429592a7982d2bdf647f1d092754c94fc73ed152e1d48e334b4"' :
                                            'id="xs-components-links-module-Tab1PageModule-9021517ddba37032dd18c1d90fee452e14e2fd1fa587c78d68c7b32dca5af7cca335b70ef9d93429592a7982d2bdf647f1d092754c94fc73ed152e1d48e334b4"' }>
                                            <li class="link">
                                                <a href="components/Tab1Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab1Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageRoutingModule.html" data-type="entity-link" >Tab1PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageModule.html" data-type="entity-link" >Tab2PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab2PageModule-118760bf412dd50dd8d8f4070968fe193becb42a03450040eb6d3f2c8340723a00a2cf293ef04d9072f55034125210b9daf29c3faaee663be7645732a5fef2d4"' : 'data-target="#xs-components-links-module-Tab2PageModule-118760bf412dd50dd8d8f4070968fe193becb42a03450040eb6d3f2c8340723a00a2cf293ef04d9072f55034125210b9daf29c3faaee663be7645732a5fef2d4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab2PageModule-118760bf412dd50dd8d8f4070968fe193becb42a03450040eb6d3f2c8340723a00a2cf293ef04d9072f55034125210b9daf29c3faaee663be7645732a5fef2d4"' :
                                            'id="xs-components-links-module-Tab2PageModule-118760bf412dd50dd8d8f4070968fe193becb42a03450040eb6d3f2c8340723a00a2cf293ef04d9072f55034125210b9daf29c3faaee663be7645732a5fef2d4"' }>
                                            <li class="link">
                                                <a href="components/Tab2Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab2Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageRoutingModule.html" data-type="entity-link" >Tab2PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageModule.html" data-type="entity-link" >Tab3PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab3PageModule-dcdbb3848ebec8f43ab14db6d4a9bbf4980cfc27b4cd46eaf437dae0cdd36a6a9e9e5060cb361705693876b26a1737fe76964c7a1a6283b0a7c7c89589732067"' : 'data-target="#xs-components-links-module-Tab3PageModule-dcdbb3848ebec8f43ab14db6d4a9bbf4980cfc27b4cd46eaf437dae0cdd36a6a9e9e5060cb361705693876b26a1737fe76964c7a1a6283b0a7c7c89589732067"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab3PageModule-dcdbb3848ebec8f43ab14db6d4a9bbf4980cfc27b4cd46eaf437dae0cdd36a6a9e9e5060cb361705693876b26a1737fe76964c7a1a6283b0a7c7c89589732067"' :
                                            'id="xs-components-links-module-Tab3PageModule-dcdbb3848ebec8f43ab14db6d4a9bbf4980cfc27b4cd46eaf437dae0cdd36a6a9e9e5060cb361705693876b26a1737fe76964c7a1a6283b0a7c7c89589732067"' }>
                                            <li class="link">
                                                <a href="components/Tab3Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab3Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageRoutingModule.html" data-type="entity-link" >Tab3PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab4PageModule.html" data-type="entity-link" >Tab4PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab4PageModule-f1aef7680b63b3b08b3c3554e79a2039693c819a4dc2c87e66d91e8a42b55f19fd48add29ad4f2b40e1e1013e2474f85032c06d58abc6a7dbfac94b1407bfba0"' : 'data-target="#xs-components-links-module-Tab4PageModule-f1aef7680b63b3b08b3c3554e79a2039693c819a4dc2c87e66d91e8a42b55f19fd48add29ad4f2b40e1e1013e2474f85032c06d58abc6a7dbfac94b1407bfba0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab4PageModule-f1aef7680b63b3b08b3c3554e79a2039693c819a4dc2c87e66d91e8a42b55f19fd48add29ad4f2b40e1e1013e2474f85032c06d58abc6a7dbfac94b1407bfba0"' :
                                            'id="xs-components-links-module-Tab4PageModule-f1aef7680b63b3b08b3c3554e79a2039693c819a4dc2c87e66d91e8a42b55f19fd48add29ad4f2b40e1e1013e2474f85032c06d58abc6a7dbfac94b1407bfba0"' }>
                                            <li class="link">
                                                <a href="components/Tab4Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab4Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab4PageRoutingModule.html" data-type="entity-link" >Tab4PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link" >TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsPageModule-dc93590fcd51989cf2be001df22f204fb41bc791691c0515c89872850cdf21bdbc804a684cd85920a619fe6af992e60c324587eb378529eb406f77d16a295454"' : 'data-target="#xs-components-links-module-TabsPageModule-dc93590fcd51989cf2be001df22f204fb41bc791691c0515c89872850cdf21bdbc804a684cd85920a619fe6af992e60c324587eb378529eb406f77d16a295454"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-dc93590fcd51989cf2be001df22f204fb41bc791691c0515c89872850cdf21bdbc804a684cd85920a619fe6af992e60c324587eb378529eb406f77d16a295454"' :
                                            'id="xs-components-links-module-TabsPageModule-dc93590fcd51989cf2be001df22f204fb41bc791691c0515c89872850cdf21bdbc804a684cd85920a619fe6af992e60c324587eb378529eb406f77d16a295454"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link" >TabsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiService.html" data-type="entity-link" >ApiService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/LoginData.html" data-type="entity-link" >LoginData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});