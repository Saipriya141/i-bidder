(function(n){n.module("gap.angularcarousel.directive",[]).directive("angularcarousel",["configUrl","staticTemplate",function(n,t){return{template:function(){return t},replace:!0,controller:["$scope","$http",function(t,i){i.get(n).success(function(n){t.items=n.items.slice(0),t.heroItem=n.items[0],t.highlightItems=n.items.slice(1)})}]}}])})(angular),function(n){n.module("gap.angularcarousel",["gap.angularcarousel.directive","image.filter","angular-carousel","gap.angularcarousel.constants"])}(angular)