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
                                            'data-target="#components-links-module-AppModule-89c779ecddbb1bc399859cd8b0cddac956dc18008a28224d2b792545ea2264df9ac0397b61109394683b67a73ed359bf9317cd61f1aecf7fa3a7cb8c96c838d7"' : 'data-target="#xs-components-links-module-AppModule-89c779ecddbb1bc399859cd8b0cddac956dc18008a28224d2b792545ea2264df9ac0397b61109394683b67a73ed359bf9317cd61f1aecf7fa3a7cb8c96c838d7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-89c779ecddbb1bc399859cd8b0cddac956dc18008a28224d2b792545ea2264df9ac0397b61109394683b67a73ed359bf9317cd61f1aecf7fa3a7cb8c96c838d7"' :
                                            'id="xs-components-links-module-AppModule-89c779ecddbb1bc399859cd8b0cddac956dc18008a28224d2b792545ea2264df9ac0397b61109394683b67a73ed359bf9317cd61f1aecf7fa3a7cb8c96c838d7"' }>
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