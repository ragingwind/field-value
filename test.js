import test from 'ava';
import fn from './';
import deep from 'deep-equal';

const target = {
	'key1': 'value1',
	'key2': 1,
	'key3': [3, 'value3'],
	'key4': {
		'key4_1': 'value4_1',
		'key4_2': 'value4_2'
	},
	'key5': [
		'value5_1', 'value5_1', 'value5_1'
	],
	'key6': {
		'key6_1': {
			'key6_1_1': [
				'value6_1_1_1', 'value6_1_1_2'
			]
		}
	},
	'key7': [
		['value7_1', {'key7_2': 'value7_2'}]
	],
	'key8': [
		[{'key8_1': ['value_8_1', 'value_8_2']}]
	],
	'key9': [
		'key9_1'
	],
	'key10': {
		'key10_1': [
			'value10_1_1', 'value10_1_2', {'key10_1_3': 'value10_1_3'}
		]
	},

};

const expected = [
	'key1="value1"',
	'key2=1',
	'key3=[3,"value3"]',
	'key4={"key4_1":"value4_1","key4_2":"value4_2"}',
	'key5=["value5_1","value5_1","value5_1"]',
	'key6={"key6_1":{"key6_1_1":["value6_1_1_1","value6_1_1_2"]}}',
	'key7=[["value7_1",{"key7_2":"value7_2"}]]',
	'key8=[[{"key8_1":["value_8_1","value_8_2"]}]]',
	'key9=["key9_1"]',
	'key10={"key10_1":["value10_1_1","value10_1_2",{"key10_1_3":"value10_1_3"}]}'
];


test('returns well-serialized string', t => {
	const values = fn.pairify(target);

	expected.forEach(function (v, i) {
		t.is(values[i], v);
	});

	t.end();
});

test('deserialized strings', t => {
	for (const [key, v] of Object.entries(fn.parse(fn.pairify(target)))) {
		t.ok(deep(v, target[key]));
	}

	t.end();
});
