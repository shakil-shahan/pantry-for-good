import angular from 'angular';

export default angular.module('donor')
  .component('generalInfo', {
    bindings: {
      dynForm: '=',
      donor: '='
    },
    template: `
      <!-- Sections -->
      <div ng-repeat="section in $ctrl.dynForm track by $index" class="clearfix">
        <!-- Box -->
        <div class="box box-solid box-primary">
          <!-- Box header -->
          <div class="box-header">
            <h3 class="box-title">SECTION {{$ctrl.filteredSections[$index].name | uppercase}}</h3>
          </div> <!-- box-header-->
          <!-- Box body -->
          <div class="box-body">
            <!-- Rows -->
            <div ng-repeat="row in section track by $index" class="row">
              <!-- <div ng-repeat="cell in row track by $index" class="col-xs-{{3*cell.span || 3}}"> -->
              <div ng-repeat="cell in row track by $index">
                <!-- Make room for cell if empty or span ??? -->
                <div ng-show="cell.status == 'invalid' || cell.span > 0" class="col-xs-{{3*cell.span || 3}}">
                  <div ng-hide="cell.status == 'invalid'">

                    <div class="form-group">
                      <label>{{cell.label}}</label>

                      <!-- Normal text input -->
                      <input ng-if="cell.type == 'Text'" class="form-control" type="text" ng-model="$ctrl.donor[cell.name]" placeholder="{{cell.label}}">

                      <!-- Textarea input -->
                      <textarea ng-if="cell.type == 'Textarea'" class="form-control" ng-model="$ctrl.donor[cell.name]" placeholder="{{cell.label}}"></textarea>

                      <!-- Date input -->
                      <input ng-if="cell.type == 'Date'" class="form-control" type="date" ng-model="$ctrl.donor[cell.name]">

                      <!-- Radio buttons -->
                      <div ng-if="cell.type == 'Radio Buttons'">
                        <div ng-repeat="choice in cell.choices.split(',')" {{cell.choices}} <label class="radio-inline">
                          <input name="{{cell.name}}" type="radio" ng-model="$ctrl.donor[cell.name]" value="{{choice.trim()}}"> {{choice.trim()}}
                          </label>
                        </div> <!-- Repeat choices -->
                      </div> <!-- Radio buttons -->

                      <!-- Checkboxes -->
                      <div ng-if="cell.type == 'Checkboxes'">
                        <div ng-repeat="choice in cell.choices.split(',')" {{cell.choices}} <label class="checkbox-inline">
                          <input name="{{cell.name}}" type="checkbox" value="{{choice.trim()}}"
                            ng-click="handleCheckboxClick(cell.name, choice.trim())"
                          >
                            <{{cell.name}}> {{choice.trim()}}
                          </label>
                        </div> <!-- Repeat choices -->
                      </div> <!-- Checkboxes -->

                    </div> <!-- form group -->
                  </div>
                </div>
              </div>
            </div>
          </div> <!-- box-body -->
        </div> <!-- box -->
      </div> <!-- section -->
    `
  })
  .name;
