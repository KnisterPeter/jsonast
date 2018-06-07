// tslint:disable-next-line:no-implicit-dependencies
import test from 'ava';
import { CharacterStream } from '../src/character-stream';

test('CharacterStream should return the current character', t => {
  const cs = new CharacterStream('some test');
  t.is(cs.ch, 's');
});

test('CharacterStream should indicate end of input', t => {
  const cs = new CharacterStream('');
  t.true(cs.eoi);
});

test('CharacterStream should return the current line', t => {
  const cs = new CharacterStream('a');
  t.is(cs.line, 1);
});

test('CharacterStream should return the current column', t => {
  const cs = new CharacterStream('a');
  t.is(cs.column, 1);
});

test('CharacterStream should return the current character offset', t => {
  const cs = new CharacterStream('a');
  t.is(cs.offset, 0);
});

test('CharacterStream should return the current position', t => {
  const cs = new CharacterStream('a');
  t.deepEqual(cs.pos, {
    line: 1,
    column: 1,
    char: 0
  });
});

test('CharacterStream should return if the expected character is met', t => {
  const cs = new CharacterStream('a');
  t.notThrows(() => cs.expect('a'));
});

test('CharacterStream should fail if the expected character is not met', t => {
  const cs = new CharacterStream('a');
  t.throws(() => cs.expect('b'), /Unexpected character/);
});

test('CharacterStream should increment column and offset on read', t => {
  const cs = new CharacterStream('abc');
  cs.next();
  t.is(cs.line, 1);
  t.is(cs.column, 2);
  t.is(cs.offset, 1);
});

test('CharacterStream should increment line and offset on read newline', t => {
  const cs = new CharacterStream('\nbc');
  cs.next();
  t.is(cs.line, 2);
  t.is(cs.column, 1);
  t.is(cs.offset, 1);
});

test('CharacterStream should throw if multiple characters could not be accepted', t => {
  const cs = new CharacterStream('abc');
  t.throws(() => cs.accept('abd'), /Unexpected character/);
});

test('CharacterStream should skip if possible', t => {
  const cs = new CharacterStream('abc');
  t.true(cs.skip('a'));
  t.is(cs.ch, 'b');
});

test('CharacterStream should not skip if not possible', t => {
  const cs = new CharacterStream('abc');
  t.false(cs.skip('b'));
  t.is(cs.ch, 'a');
});
