var filtertype = [
    { id: 'FilterBar', type: 'FilterBar' },
    { id: 'Menu', type: 'Menu' },
    { id: 'CheckBox', type: 'CheckBox' },
    { id: 'Excel', type: 'Excel' }
];
var type = [
    { id: 'Single', type: 'Single' },
    { id: 'Multiple', type: 'Multiple' }
];

var editmode = [
    { id: 'Inline', mode: 'Inline' },
    { id: 'Batch', mode: 'Batch' },
    { id: 'Dialog', mode: 'Dialog' }
];


var remoteData = new ej.data.DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/',
    adaptor: new ej.data.ODataV4Adaptor
});

var grid = new ej.grids.Grid({
    dataSource: window.orderData,
    height: 300,
    enableInfiniteScrolling: true,
    // enableVirtualization: true,
    // allowPaging: true,
    allowSorting: true,
    allowGrouping: true,
    // allowResizing: true,
    allowFiltering: true,
    allowPdfExport: true,
    // allowReordering: true,
    // allowExcelExport: true,
    // showColumnChooser: true,
    allowRowDragAndDrop: true,
    filterSettings: { type: 'Excel' },
    selectionSettings: { type: 'Multiple' },
    rowDrop: function(args) {
        // debugger;
    },
    groupSettings: { allowReordering: true},
    // pageSettings: { pageCount: 5, pageSizes: true },
    editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },// , mode: 'Dialog'
    toolbar: ['Add', 'Delete', 'Update', 'Cancel', 'Search'],
    columns: [
        { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, textAlign: 'Right', width: 120, validationRules: { required: true } },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120, editType: 'dropdownedit' },
        { field: 'Freight', headerText: 'Frieght', width: 120, format: 'C2', editType: 'numericedit', textAlign: 'Right' },
        { field: 'OrderDate', headerText: 'Order Date', width: 120, format: 'yMd', editType: 'datepickeredit', textAlign: 'Right' },
        { field: 'ShipCity', headerText: 'Ship City', width: 120, template: '<button>${ShipCity}</button>',  validationRules: { required: true, minLength: 3, maxLength: 20 } },
        { field: 'ShipName', headerText: 'Ship Name', width: 120, clipMode: 'EllipsisWithTooltip' },
        { field: 'ShipCountry', headerText: 'Ship Country', width: 120 },
        { field: 'ShipRegion', headerText: 'Ship Region', width: 120, type: 'string' },
    ],
    aggregates: [{
        columns: [
            {
                type: 'Sum',
                field: 'Freight',
                format: 'C2',
                footerTemplate: 'Sum: ${Sum}'
            },
            {
                type: 'Average',
                field: 'Freight',
                format: 'C2',
                groupCaptionTemplate: 'Average: ${Average}'
            },
        ]
    },
    {
        columns: [
            {
                type: 'Sum',
                field: 'Freight',
                format: 'C2',
                groupFooterTemplate: 'Sum : ${Sum}'
            },
            {
                type: 'Average',
                field: 'Freight',
                format: 'C2',
                groupCaptionTemplate: 'Average: ${Average}'
            },
        ]
    }]
});
grid.appendTo('#Grid');

//Render DropDownList component for selection type.
var dropDownType = new ej.dropdowns.DropDownList({
    dataSource: type,
    fields: { text: 'type', value: 'id' },
    value: 'Multiple',
    width: 100,
    change: function (e) {
        var type = e.value;
        grid.selectionSettings.type = type;
    }
});
dropDownType.appendTo('#type');

//Render DropDownList component for selection type.
var editMode = new ej.dropdowns.DropDownList({
    dataSource: editmode,
    fields: { text: 'mode', value: 'id' },
    value: 'Inline',
    width: 100,
    change: function (e) {
        var mode = e.value;
        grid.editSettings.mode = mode;
    },
});
editMode.appendTo('#editMode');

var dropDownFilterType = new ej.dropdowns.DropDownList({
    dataSource: filtertype,
    fields: { text: 'type', value: 'id' },
    value: 'Excel',
    width: 100,
    change: function (e) {
        var dropSelectedValue = e.value;
        grid.filterSettings.type = dropSelectedValue;
        grid.clearFiltering();
    }
});
dropDownFilterType.appendTo('#filterType');

var checkBoxObj = new ej.buttons.CheckBox({ label: 'Enable RTL', change: function (e) {
    grid.enableRtl = e.checked;
} });
checkBoxObj.appendTo('#rtlmode');

var enableChk = new ej.buttons.CheckBox({ label: 'Checkbox column', change: function (args) {
    if (args.checked) {
        grid.columns = [
            { type: 'checkbox', width: 60 },
            { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, textAlign: 'Right', width: 120, validationRules: { required: true } },
            { field: 'CustomerID', headerText: 'Customer ID', width: 120, editType: 'dropdownedit' },
            { field: 'Freight', headerText: 'Frieght', width: 120, format: 'C2', editType: 'numericedit', textAlign: 'Right' },
            { field: 'OrderDate', headerText: 'Order Date', width: 120, format: 'yMd', editType: 'datepickeredit', textAlign: 'Right' },
            { field: 'ShipCity', headerText: 'Ship City', width: 120, validationRules: { required: true, minLength: 3, maxLength: 20 } },
            { field: 'ShipName', headerText: 'Ship Name', width: 120, clipMode: 'EllipsisWithTooltip' },
            { field: 'ShipCountry', headerText: 'Ship Country', width: 120 },
            { field: 'ShipRegion', headerText: 'Ship Region', width: 120, type: 'string' },
        ];
    } else {
        grid.columns = [
            { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, textAlign: 'Right', width: 120, validationRules: { required: true } },
            { field: 'CustomerID', headerText: 'Customer ID', width: 120, editType: 'dropdownedit' },
            { field: 'Freight', headerText: 'Frieght', width: 120, format: 'C2', editType: 'numericedit', textAlign: 'Right' },
            { field: 'OrderDate', headerText: 'Order Date', width: 120, format: 'yMd', editType: 'datepickeredit', textAlign: 'Right' },
            { field: 'ShipCity', headerText: 'Ship City', width: 120, validationRules: { required: true, minLength: 3, maxLength: 20 } },
            { field: 'ShipName', headerText: 'Ship Name', width: 120, clipMode: 'EllipsisWithTooltip' },
            { field: 'ShipCountry', headerText: 'Ship Country', width: 120 },
            { field: 'ShipRegion', headerText: 'Ship Region', width: 120, type: 'string' },
        ];

    }
} });
enableChk.appendTo('#enableChk');

var enablecache = new ej.buttons.CheckBox({ label: 'Enable Cache', change: function (args) {
    grid.setProperties({
        filterSettings: {
            columns: []
        },
        groupSettings: { columns : [] },
        sortSettings: { columns: [] },
        infiniteScrollSettings: { enableCache : args.checked }
    }, true);
    grid.freezeRefresh();
} });
enablecache.appendTo('#enablecache');

var remotedata = new ej.buttons.CheckBox({ label: 'Remote Data', change: function (args) {
    grid.setProperties({
        filterSettings: {
            columns: []
        },
        groupSettings: { columns : [] },
        sortSettings: { columns: [] },
        dataSource: args.checked ? remoteData : window.orderData
    }, true);
    grid.freezeRefresh();
} });
remotedata.appendTo('#remotedata');

var frozen = new ej.buttons.CheckBox({ label: 'Frozen', change: function (args) {
    grid.setProperties({
        filterSettings: {
            columns: []
        },
        groupSettings: { columns : [] },
        sortSettings: { columns: [] },
        // frozenRows: args.checked ? 2 : undefined,
        frozenColumns: args.checked ? 2 : undefined
    }, true);
    grid.freezeRefresh();
} });
// frozen.appendTo('#frozen');

var enablelazyload = new ej.buttons.CheckBox({ label: 'Lazy Load', change: function (args) {
    grid.clearGrouping();
    grid.setProperties({
        filterSettings: {
            columns: []
        },
        groupSettings: { columns : [], enableLazyLoading: args.checked },
        sortSettings: { columns: [] }
    }, true);
    grid.freezeRefresh();
} });
enablelazyload.appendTo('#enablelazyload');

var tooltip = new ej.popups.Tooltip({
    beforeRender: onBeforeRender
});
tooltip.appendTo('#Tooltip');

function onBeforeRender(e) {
    this.content = `<p>This sample contains the following features,</p>
    <p>1) RowDD with Infinite scrolling</p>
    <p>3) Grouping</p>
    <p>2) Lazy lod grouping</p>
    <p>4) Cache mode</p>
    <p>5) Aggregate</p>
    <p>6) Row drag and drop</p>
    <p>8) Search</p>
    <p>10) Editing</p>
    <p>15) Selection with persistence</p>`;
}