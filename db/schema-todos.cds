namespace sap.ui.todomanagement;

using {managed} from '@sap/cds/common';

entity Todos : managed {
  key ID        : UUID @(Core.Computed: true);
      title     : String(100);
      details   : String;
      completed : Boolean;
}
