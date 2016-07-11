import test from 'ava';
import deep from 'deep-equal';
import fn from './';

const target = {
	key1: 'value1',
	key2: 1,
	key3: [3, 'value3'],
	key4: {
		key41: 'value41',
		key42: 'value42'
	},
	key5: [
		'value51', 'value51', 'value51'
	],
	key6: {
		key61: {
			key611: [
				'value6111', 'value6112'
			]
		}
	},
	key7: [
		['value71', {key72: 'value72'}]
	],
	key8: [
		[{key81: ['value81', 'value82']}]
	],
	key9: [
		'key91'
	],
	key10: {
		key101: [
			'value1011', 'value1012', {key1013: 'value1013'}
		]
	}
};

const expected = [
	'key1="value1"',
	'key2=1',
	'key3=[3,"value3"]',
	'key4={"key41":"value41","key42":"value42"}',
	'key5=["value51","value51","value51"]',
	'key6={"key61":{"key611":["value6111","value6112"]}}',
	'key7=[["value71",{"key72":"value72"}]]',
	'key8=[[{"key81":["value81","value82"]}]]',
	'key9=["key91"]',
	'key10={"key101":["value1011","value1012",{"key1013":"value1013"}]}'
];

test('returns well-serialized string', t => {
	const values = fn.pairify(target);

	expected.forEach(function (v, i) {
		t.is(values[i], v);
	});
});

test('deserialized strings', t => {
	for (const [key, v] of Object.entries(fn.parse(fn.pairify(target)))) {
		t.true(deep(v, target[key]));
	}
});
